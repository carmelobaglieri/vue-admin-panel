import $ from "jquery";
import { store } from '@/store';
import { Tooltip } from 'bootstrap';

export const Utils = {
   
   data(){
      return {
      }
   },

   methods: {

      sprintf( format, args ) {

         var parts = format.split('%s');
         var res = '';
         
         for( var i=0; i < parts.length; i++ ){
            res += parts[i];
            if( args[i] ){
               res += args[i];
            }
         }

         return res;
      },

      getOS() {
         var userAgent = window.navigator.userAgent,
             platform = window.navigator.platform,
             macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
             windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
             iosPlatforms = ['iPhone', 'iPad', 'iPod'],
             os = null;
       
         if (macosPlatforms.indexOf(platform) !== -1) {
           os = 'Mac OS';
         } else if (iosPlatforms.indexOf(platform) !== -1) {
           os = 'iOS';
         } else if (windowsPlatforms.indexOf(platform) !== -1) {
           os = 'Windows';
         } else if (/Android/.test(userAgent)) {
           os = 'Android';
         } else if (!os && /Linux/.test(platform)) {
           os = 'Linux';
         }
       
         return os;
      },

      changeLocale(locale) {
         if( ! locale ){ return; }
         this.$i18n.locale = locale.split('_')[0]
         store.commit("account/setLocale", locale)
         store.dispatch("content/getStrings")
         store.dispatch("account/get_user")
      },

      __( str ){

         var locale = store.state.account.locale ? store.state.account.locale.split('_')[0] : '';
         if( this.$i18n ){
            this.$i18n.locale = locale || this.$i18n.locale || 'it';
            var s_i18n = this.$i18n.messages[this.$i18n.locale][str];
         }

         var s_i18n = this.$i18n.messages[this.$i18n.locale][str];
         var s_i18n = ( str && s_i18n != undefined ) ? s_i18n : '';
         var strings = store.getters['content/strings'];

         if( s_i18n ){
            return s_i18n;
         }

         if( Object.keys(strings).length && strings[str] ){
            return strings[str]
         }        

         return str;
      },

      capitalize( string, splitFlag = '-', joinFlag = '' ){
         return string.split(splitFlag).map((el) => { return el.charAt(0).toUpperCase().concat(el.slice(1)); }).join(joinFlag);
      },

      makeid( length = 6 ) {
         var result           = '';
         var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
         var charactersLength = characters.length;
         for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
         return result;
      },

      format_date(m) {
         const d = new Date(m.replace(/ /g,"T"));
         return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      },

      formatPrice( price, currency = 'EUR', replaceCurr = 'euro' ){
         return '€ ' + new Intl.NumberFormat('it-IT', { style: 'currency', currency: currency, currencyDisplay: 'name' }).format(parseFloat(price)).replace(" "+replaceCurr,"");
      },

      scrollToTop(){
         
         setTimeout(function(){ 
            $('#content .container-fluid').scrollTop(0);
         }, 200);
         
      },

      get_order_status(key) {
         switch(key){
            case 'on-hold':
               return {
                  label: 'In sospeso',
                  alertClass: 'alert-warning'
               }
            case 'completed':
               return {
                  label: 'Completato',
                  alertClass: 'alert-success'
               }
            case 'pending':
               return {
                  label: 'In attesa di pagamento',
                  alertClass: 'alert-dark'
               }
            case 'processing':
               return {
                  label: 'In lavorazione',
                  alertClass: 'alert-warning'
               }
            case 'cancelled':
               return {
                  label: 'Cancellato',
                  alertClass: 'alert-danger'
               }
            case 'failed':
               return {
                  label: 'Fallito',
                  alertClass: 'alert-danger'
               }
            case 'refunded':
               return {
                  label: 'Rimborsato',
                  alertClass: 'alert-dark'
               }
            case 'progress':
               return {
                  label: 'In corso',
                  alertClass: 'alert-primary'
               }
            default:
               return {
                  label: key,
                  alertClass: 'alert-dark'
               }
         }
      },

      async __get( url, params = {}, headers = {}, config = {} ){

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
      
      },

      async __post( url, params = {}, headers = {}, config = {} ){

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
      
      },

      isElementInView ( element, fullyInView = false, top = null, bottom = null ) {
         if( ! $(element).length ){ return false; }
         var pageTop = $(window).scrollTop();
         var pageBottom = pageTop + $(window).height();
         var elementTop = (top != null) ? top : $(element).offset().top;
         var elementBottom = elementTop + $(element).height();
         elementBottom += (bottom != null) ? bottom : 0;
   
         if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
         } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
         }
      },

      validPassword(password){
         var errors = [];
         var find_special = new RegExp("[^A-Za-z0-9]");
         var find_numero = new RegExp("[0-9]");
         var find_maiuscola = new RegExp("[A-Z]");
         var find_minuscola = new RegExp("[a-z]");

         var results = [
            find_special.test(password),
            find_numero.test(password),
            find_maiuscola.test(password),
            find_minuscola.test(password)
         ];

         var score = results.filter(function(el){
            return (el) ? el : false;
         })
        

         if( score.length >= 4 ){

            if( password.length < 8 ){
               errors.push({text:'Password troppo corta'});
            }

         }else{
            
            errors.push({text:'La password deve contenere almeno 8 caratteri tra maiuscole, minuscole, simboli e numeri<br>es: <em>P@ssword1</em>'});
                        
         }

         return errors;
      },

      switchPasswordView( el ){
         var wrap = $(el).closest('.pass-wrap');
         var input = wrap.find('input');
         if( input.attr('type') == 'password' ){
            input.attr('type', 'text');
            wrap.find('.switcher i').attr('class','fa-regular fa-eye-slash');
         }else{
            input.attr('type','password');
            wrap.find('.switcher i').attr('class','fa-regular fa-eye');
         }
      },

      formatDate( dateString, format = 'toLocaleDateString' ){
         const date = new Date(dateString);

         if( format == 'toString' ){
            return date.toString();
         }
         if( format == 'toTimeString' ){
            return date.toTimeString();
         }
         if( format == 'toUTCString' ){
            return date.toUTCString();
         }
         if( format == 'toDateString' ){
            return date.toDateString();
         }
         if( format == 'toISOString' ){
            return date.toISOString();
         }
         if( format == 'toLocaleString' ){
            return date.toLocaleString();
         }
         if( format == 'toLocaleDateString' ){
            return date.toLocaleDateString();
         }
         if( format == 'toLocaleTimeString' ){
            return date.toLocaleTimeString();
         }
         if( format == 'getTime' ){
            return date.getTime();
         }

         return date;
      },

      arrayUnique(value, index, self) {
         console.log(value,index,self)
         return self.indexOf(value) === index;
      },

      scrollAnchors(){
         // scroll anchors
         var hash = this.$route.hash;
         $(document).ready(function(){
            
            if( ! hash ){ return }
            var el = $(hash);
            if( el.length ){
               var offset = el.offset() || {top:0};
               window.scrollTo( 0, offset.top - 100 )
            }
         })
      },

      getDataUrl( img, mime = 'image/png' ){

         // Create canvas
         const canvas = document.createElement('canvas');
         const ctx = canvas.getContext('2d');
         // Set width and height
         canvas.width = img.width;
         canvas.height = img.height;
         // Draw the image
         ctx.drawImage(img, 0, 0);
         return canvas.toDataURL();

      },

      check_response_errors( res ){

         var errors = [];

         if( ! res.success ){

            if( res.errors ){
               errors = res.errors;
            }

            if( res.error || res.message ){
               errors.push({ text: res.error || res.message });
            }
            
            
         }else{
            
            if( res.message ){
               errors.push({ text: res.message, type: 'success' });
            }

         }

         if( res.redirect ){
            setTimeout( () => {
               window.location.href = res.redirect;
            }, 1000 );
         }

         return errors;

      },

      initSidebar(){

         $(document).off('click', '#sidebarToggleTop');
         
         $(document).on('click', '#sidebarToggleTop', function(){
            
            if( $('body').hasClass('sidebar-toggled') ){
               $('body').removeClass('sidebar-toggled');
            }else{
               $('body').addClass('sidebar-toggled');
            }
         })

         $(document).on('click', '.sidebar-toggled #content-wrapper', function(){
            if( $('body').hasClass('sidebar-toggled') ){
               $('body').removeClass('sidebar-toggled');
            }
         })

         $(window).on('resize', function(){
            $('body').removeClass('sidebar-toggled');
         })
         
      },

   },

   mounted(){
            
   }
}

$(document).on('click', '[data-bs-toggle="tooltip"]', function(){
   var el = $(this).get(0);
   var tooltip = new Tooltip( el, el.dataset );
   tooltip.show();
   setTimeout( () => {
      tooltip.hide()
   }, 1000 )
})

