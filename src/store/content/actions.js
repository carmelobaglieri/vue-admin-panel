import $ from 'jquery'
import router from '@/router'
import { Vars } from '@/inc/Variables';
import { Utils } from '@/inc/Utils';
import { store } from '@/store'

async function __get( url, params = {}, headers = {}, config = {} ){

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

async function __post( url, params = {}, headers = {}, config = {} ){

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

export async function getStrings( { commit }, payload ){
   return await __get( Vars.home_url + Vars.endpoints.app_strings, payload )
   .then(res => {

      commit('setStrings', res )
      
      return res;
   });
}

export async function getAppContent( { commit }, payload ){
   return await __get( Vars.home_url + Vars.endpoints.app_contents, payload )
   .then(res => {

      commit('setPage', {key: payload.key, value: res} )
      
      return res;
   });
}

export async function getAppData( { commit }, payload ){
   return await __get( Vars.home_url + Vars.endpoints.app_data, payload )
   .then(res => {

      commit('setAppData', res )
      
      return res;
   });
}