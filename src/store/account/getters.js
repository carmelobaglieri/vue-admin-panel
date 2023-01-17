export function user (state) {
   return state.user
}

export function locale (state) {
   return state.locale
}

export function app_status (state) {
   return state.app_status
}

export function is_logged (state) {
   return !! state.is_logged
}

export function next_validation (state) {
   return state.next_validation
}

export function platform( state ){
   return state.platform || 'web';
}

export function user_token( state ){
   return state.user_token;
}

export function user_refresh_token( state ){
   return state.user_refresh_token;
}