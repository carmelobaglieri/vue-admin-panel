import { createApp } from 'vue'
import VueApp from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'
import "bootstrap"
//import { Vars } from '@/inc/Variables.js'

const app = createApp(VueApp);



/**
 * Internationalization
 */
import { createI18n } from 'vue-i18n';

var locale = store.state.account.locale;
locale = locale ? locale.split('_')[0] : 'it'

const i18n = createI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages: {
    en: require('./languages/en_US.json'),
    it: require('./languages/it_IT.json')
  },
})

app.use(i18n);



/**
 * Provide Plugins
 */

const moment = require('moment')
moment.locale('it')
app.provide('$moment', moment)


/**
 * Global Components
 */

import Select2 from 'vue3-select2-component';

/* import VueHtmlToPaper from 'vue-html-to-paper'; 
const VueHtmlToPaperOptions = {
   name: '_blank',
   specs: [
     'fullscreen=yes',
     //'titlebar=yes',
     'scrollbars=yes'
   ],
   styles: [
     'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
     Vars.home_url + '/wp-content/plugins/familyskills/app/src/assets/css/print.css'
   ],
   timeout: 1000, // default timeout before the print window appears
   autoClose: true, // if false, the window will not close after printing
   windowTitle: window.document.title, // override the window title
}
app.use(VueHtmlToPaper, VueHtmlToPaperOptions) */

app.component('Select2', Select2)


/**
 * Mount app
 */

app.use(store).use(router).mount('#app')