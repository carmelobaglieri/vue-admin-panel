const base = 'https://new.mercatoitinerante.it';

export const Vars = {
   home_url: base,
   locale: 'it_IT',
   //logo: base + '/wp-content/themes/dftheme/images/logo.svg',
   logo: './images/logo.png',

   endpoints : {
      
      // app controller
      // authentication
      auth: {
         token: '/wp-json/app_controller/v1/token',
         token_validate: '/wp-json/app_controller/v1/token-validate',
         token_refresh: '/wp-json/app_controller/v1/token_refresh',
      },
      // contents
      app_strings: '/wp-json/app_controller/v1/get-app-strings',
      app_data: '/wp-json/app_controller/v1/get-app-data',
      app_contents: '/wp-json/app_controller/v1/get-app-contents',
      // user
      register_user: '/wp-json/app_controller/v1/register-user',
      get_user: '/wp-json/app_controller/v1/get-user',
      update_user_data: '/wp-json/app_controller/v1/update-user-data',
      delete_user: '/wp-json/app_controller/v1/delete-user',

   }
}

export const AppConfig = {
   use_cookies: false
}