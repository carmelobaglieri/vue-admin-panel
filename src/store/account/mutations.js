import { AppConfig } from '@/inc/Variables';

export function setAppStatus(state, val) {
   state.app_status = val;
   localStorage.setItem('app_status', JSON.stringify(state.app_status));
}

export function setUser(state, val) {
   state.user = val;
   localStorage.setItem('user', JSON.stringify(state.user));
}

export function setLocale(state, val) {
   state.locale = val || 'it_IT';
   localStorage.setItem('locale', state.locale);
}

export function setLoginStatus(state, val) {
   state.is_logged = val || false;
   localStorage.setItem('is_logged', state.is_logged);
}

export function setTokenValidationTimeout(state, val) {
   state.next_validation = val;
   localStorage.setItem('next_validation', val);
}

export function resetState(state, force = false, excludes = []){

   var exclude = (force) ? [...excludes] : ['loglevel:webpack-dev-server','tutorialShowed','app_status','platform', 'locale', ...excludes];
      
   Object.keys(state).forEach((key)=>{

      if( ! exclude.includes(key) ){
         if( Array.isArray(state[key]) ){
            state[key] = [];
         }else if( typeof state[key] === 'object' ){
            state[key] = {};
         }else if( typeof state[key] === 'boolean' ){
            state[key] = false;
         }else if( typeof state[key] === 'number' ){
            state[key] = 0;
         }else{
            state[key] = '';
         }
      }
      

   });

   if( AppConfig.use_cookies ){
      window.$cookies.remove("user_token");
      window.$cookies.remove("user_refresh_token");
   }
   
   
   Object.keys(localStorage).forEach((key)=>{
      if( ! exclude.includes(key) ){
         localStorage.removeItem(key);
      }
   });
}

export function setUserToken(state,val){
   state.user_token = val.token;

   if( AppConfig.use_cookies ){
      window.$cookies.set("user_token", val.token, val.expire );
   }else{
      localStorage.setItem('user_token',val.token)
   }

}

export function setUserRefreshToken(state,val){
   state.user_refresh_token = val.token;

   if( AppConfig.use_cookies ){
      window.$cookies.set("user_refresh_token", val.token, val.expire );
   }else{
      localStorage.setItem('user_refresh_token',val.token)
   }
}

export function setPlatform(state, val) {
   state.platform = val;
   localStorage.setItem('platform', val);
}