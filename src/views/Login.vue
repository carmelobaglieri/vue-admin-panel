<template>
   <div class="d-flex align-items-center justify-content-center my-5 px-3 max-400">

      <div class="box-light shadow p-0">

         <div class="box-head text-center">
            <div class="max-300">
               <h2 class="text-white">{{ __('Accedi') }}</h2>
               <p> {{ __("Inserisci la tua email e la tua password per accedere all'area riservata") }} </p>
            </div>
         </div>

         <div class="box-content p-big pt-3">

            <div class="text-center max-180 mb-3">
               <a :href="home_url || '#'">
                  <img src="../assets/images/logo.png" />
               </a>
            </div>

            <form class="login-form" @submit.prevent="login_user()">

               <div class="mb-3">
                  <label for="email" class="form-label">{{ __('Email') }} *</label>
                  <input required v-model="username" type="text" :placeholder="__('Il tuo indirizzo Email')" id="email" class="form-input bg-transparent" />
               </div>

               <div class="mb-3">
                  <label for="password" class="form-label">{{ __('Password') }} *</label>
                  <div class="pass-wrap">
                     <input required v-model="password" type="password" :placeholder="__('La tua password')" id="password" class="form-input bg-transparent mb-0" />
                     <span class="switcher" @click="switchPasswordView($event.target)"><i class="fa-regular fa-eye"></i></span>
                  </div>
                  <div class="form-text text-end">
                     <a :href="__('lostpassword_url')" class="text-decoration-none">
                        {{ __('Password dimenticata') }}
                     </a>
                  </div>
               </div>

               <!-- <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">
                     {{ __('Ricordami') }}
                  </label>
               </div> -->

               <button type="submit" class="btn btn-primary w-100 mb-3">
                  <span v-if="! login_in_corso">{{ __("Accedi al portale") }}</span>
                  <i class="fa fa-spinner rotating" v-else></i>
               </button>
               
               <LangSwitcher />
               
               <errors :errors="errors" v-if="errors.length" class="mt-4"></errors>

            </form>

            <!-- <hr class="mt-4 mb-3"/>

            <div class="social-login text-center">
               <small> {{ __('Accedi tramite:') }} </small>
               <div class="icons">
                  <i class="fa-brands fa-facebook" id="facebook"></i>
                  <i class="fa-brands fa-google ms-3" id="google"></i>
                  <i class="fa-brands fa-linkedin ms-3" id="linkedin"></i>
               </div>
            </div>

            <div class="text-center">
               <div class="my-4">
                  <small> {{ __('Oppure compila il modulo di registrazione') }}</small>
               </div>
               <router-link to="/registrazione" class="btn btn-primary-light w-100">
                  {{ __('Registrati') }}
               </router-link>
            </div> -->

            <div class="text-center">
               <div class="mt-3">
                  <a class="small text-body" :href="home_url || '#'"> {{ __('Torna alla home') }}</a>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { Vars } from '@/inc/Variables'
import { Utils } from '@/inc/Utils'
import { mapActions, mapGetters } from 'vuex'
import LangSwitcher from '../components/LangSwitcher.vue';
import Errors from '../components/Errors.vue';

export default {
   name: "Login",
   mixins: [Utils],
   
   components: {
     Errors, LangSwitcher
   },

   computed: {
      ...mapGetters('account', ['locale'])
   },

   data(){
      return {
         errors: [],
         username: '',
         password: '',
         login_in_corso: false,
         home_url: Vars.home_url
      }
   },

   methods: {

      ...mapActions("account", ["login"]),

      login_user(){
      
         const vm = this;
         this.errors = [];
         this.login_in_corso = true;

         var payload = {
            username: this.username,
            password: this.password,
            locale: this.locale,
            agent: {
               device: navigator.userAgent,
               os: this.getOS(),
            }
         }

         this.login(payload).then( (res) => {
            vm.login_in_corso = false;

            if( res.errors ){
               vm.errors = res.errors;
            }
            
            if( res.error ){
               vm.errors.push({text: res.error});
            }

         })
      }

      /* user_login(){
            
         var self = this;

         jQuery.ajax({
            url: self.globalVars.ajax_url,
            method: 'post',
            data: self.login,
            beforeSend: function(){
               self.login.msg = self.__('Login in corso');
            },
            success: function( response ){
               var res = JSON.parse(response);
               
               if( res.message ){
                  self.login.msg = res.message;
               }

               if( res.redirect ){
                  window.location.href = res.redirect;
               }
            },
            error: function( jqXHR, error ){
               self.login.msg = error +'<br>'+ self.__('Reindirizzamento') + '...';
               setTimeout(()=>{
                  window.location.reload(true);
               }, 400)
            }
         })
      }, */
   }
}
</script>
