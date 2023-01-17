import { AppConfig } from '@/inc/Variables';

export default function () {

   const user_token = (AppConfig.use_cookies) ? window.$cookies.get('user_token') : localStorage.getItem('user_token');
   const user_refresh_token = (AppConfig.use_cookies) ? window.$cookies.get('user_refresh_token') : localStorage.getItem('user_refresh_token');

   return {
      app_status: localStorage.getItem('app_status') || '',
      user_token: user_token || '',
      user_refresh_token: user_refresh_token || '',
      next_validation: localStorage.getItem('next_validation') || 0,
      is_logged: localStorage.getItem('is_logged') || false,
      user: JSON.parse(localStorage.getItem('user')) || {},
      locale: localStorage.getItem('locale') || 'it_IT',
      platform: localStorage.getItem('platform') || 'web',
   }
}