import $ from 'jquery'
import router from '@/router'
import { Vars } from '@/inc/Variables';
import { Utils } from '@/inc/Utils';
import { store } from '@/store'

/* const abortController = new AbortController();
const signal = abortController.signal; */

export async function __get( url, params = {}, headers = {}, config = {} ){

   try {

      params.platform = store.getters["account/platform"];
      params.locale = params.locale || store.getters["account/locale"];

      url = new URL(url);

      if( Object.keys(params).length ){
         Object.keys(params).forEach( (key) => {
            if( Array.isArray(params[key]) ){
               params[key].forEach( (el, i) => {
                  url.searchParams.append( key+'['+i+']', el );
               })
            }else{
               url.searchParams.append( key, params[key] );
            }
         })
      }

      headers = { 
         'Content-Type': 'application/json',
         // 'Content-Type': 'application/x-www-form-urlencoded',
         ...headers
      };

      if( params.token ){
         headers['Authorization'] = "Barear " + params.token;
      }

      config = {
         method: 'GET', // *GET, POST, PUT, DELETE, etc.
         mode: 'cors', // no-cors, *cors, same-origin
         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
         credentials: 'same-origin', // include, *same-origin, omit
         headers: headers,
         redirect: 'follow', // manual, *follow, error
         referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
         ...config
      }
      
      var response = await fetch(url.href, config);
      let res = await response.json();

      if( res.error && res.error == 'invalid_token' ){
         store.commit('account/setTokenValidationTimeout',0)
         return await store.dispatch('account/validate_token').then( async (json) => {
            config.headers['Authorization'] = "Barear " + json.token;
            response = await fetch(url, config);
            return await response.json();
         })
      }
      
      return res;
      
   } catch (error) {
      console.log(error)
   }

}

export async function __post( url, params = {}, headers = {}, config = {} ){

   try {
      params.platform = store.getters["account/platform"];
      params.locale = params.locale || store.getters["account/locale"];

      headers = { 
         'Content-Type': 'application/json',
         // 'Content-Type': 'application/x-www-form-urlencoded',
         ...headers
      };

      if( params.token ){
         headers['Authorization'] = "Barear " + params.token;
      }

      config = {
         method: 'POST', // *GET, POST, PUT, DELETE, etc.
         mode: 'cors', // no-cors, *cors, same-origin
         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
         credentials: 'same-origin', // include, *same-origin, omit
         headers: headers,
         redirect: 'follow', // manual, *follow, error
         referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
         body: JSON.stringify( params ), // body data type must match "Content-Type" header
         ...config
      };

      let response = await fetch(url, config);
      let res = await response.json();

      if( res.error && res.error == 'invalid_token' ){
         store.commit('account/setTokenValidationTimeout',0)
         return await store.dispatch('account/validate_token').then( async (json) => {
            config.headers['Authorization'] = "Barear " + json.token;
            response = await fetch(url, config);
            return await response.json();
         })
      }
      
      return res;
            
   } catch (error) {
      console.log(error)
   }

}

export async function validate_token({ commit, state, dispatch }) {
   
   if( Math.floor(Date.now() / 1000) <= parseInt(state.next_validation) ){
      return;
   }
   
   return await __post( 
      Vars.home_url + Vars.endpoints.auth.token_validate, 
      {
         refresh_token:  state.user_refresh_token
      },
      {
         'Authorization' : 'Barear ' + state.user_token
      }
   ).then(res => {

      var next_validation = Math.floor(Date.now() / 1000) + 600; // 10 minuti
      commit("setTokenValidationTimeout", next_validation);
      
      if( ! res ){
         dispatch('logout');
         return res;
      }

      commit('setUserToken', {token: res.token, expire: new Date(res.token_expire * 1000) });
      dispatch('get_user');
      return res;

   }).catch( (err) => {

      dispatch('logout');
      return err;
   });

}

export async function login({ commit }, payload) {
   return await __post( 
      Vars.home_url + Vars.endpoints.auth.token, 
      payload
   )
   .then(res => {
      
      if( res.token ){
         commit('setUserToken', {token: res.token, expire: new Date(res.token_expire * 1000) });
         commit('setUserRefreshToken', {token: res.refresh_token, expire: new Date(res.refresh_token_expire * 1000) });
         commit("setLoginStatus", true);
         commit("setAppStatus", 'login');

         var p1 = store.dispatch("account/get_user");
         var p2 = store.dispatch('content/getStrings');

         store.commit('content/setPageLoading', true);
         
         Promise.all([ p1, p2 ]).then( res => {
            store.commit('content/setPageLoading', false);
         })
         
         // prevent cart not empty after login for not logged user
         //store.dispatch('wc/loadLocalCart');
         router.push('/')
      }

      $('body').removeClass('sidebar-toggled');

      return res;
   });

}

export function logout( { commit, dispatch } ) {
   //store.dispatch('wc/destroyCart');
   commit('resetState')
   commit("setLoginStatus", false);
   commit('setAppStatus', 'logout')
   
   setTimeout( () => {
      commit('resetState')
      commit('setAppStatus', 'logout')
   }, 2000 );

   $('body').removeClass('sidebar-toggled');

   router.push('/');
}

export async function get_user( {commit, dispatch, state} ) {
   

   if( ! state.is_logged || state.app_status == 'logout' ){ return {}; }

   return await __get( 
      Vars.home_url + Vars.endpoints.get_user,
      {},
      {
         'Authorization' : 'Barear ' + state.user_token
      }
   )
   .then(res => {
      
      if( res.error && res.error == 'invalid_token' ){
         commit("setTokenValidationTimeout", 0);
         dispatch('validate_token')
         return;
      }

      commit("setUser", res)
      return res;     
      
   });

}

export async function save_user_data( {dispatch, state}, payload ){

   return await __post( 
      Vars.home_url + Vars.endpoints.update_user_data, 
      payload,
      {
         'Authorization' : 'Barear ' + state.user_token
      }
   ).then(res => {
      dispatch('get_user');
      return res;

   }).catch( (err) => {
      return err;
   });

}

export async function register({ commit, dispatch }, payload) {

   /* console.log(payload);
   return; */
   return await __post( 
      Vars.home_url + Vars.endpoints.register_user, 
      payload
   )
   .then(res => {
      
      if( res && res.token ){
         commit('setUserToken', {token: res.token, expire: new Date(res.token_expire * 1000) });
         commit('setUserRefreshToken', {token: res.refresh_token, expire: new Date(res.refresh_token_expire * 1000) });
         commit("setLoginStatus", true);
         router.push('/account')
      }else{
         dispatch('logout')
      }

      return res;
   });

}

export async function edit_usermeta( { state }, payload ){

   return await __post( 
      Vars.home_url + Vars.endpoints.edit_usermeta, 
      payload,
      {
         'Authorization' : 'Barear ' + state.user_token
      }
   ).then(res => {  

      return res;
      
   }).catch( (err) => {
      return err;
   });

}