   <template id="profilo-genitore">
      <div>
         
         <h2> {{ __('Profilo personale') }} </h2>
         <p> {{ sprintf(__("Ciao %s, questa è la sezione dove potrai modificare i tuoi dati personali."), [ user.meta.first_name || user.display_name ] ) }} </p>
         
         
         <!-- dati personali -->
         <div class="box-light p-4 mb-3">
            
            <h3 class="title">{{ __("Dati personali") }}</h3>
            
            <form class="edit-form"  v-on:submit.prevent="user_edit_profile()" >
               
               <div class="row">
                  <div class="col-md-6">
                     <!-- last_name -->
                     <div class="mb-3">
                        <label for="last_name" class="form-label">{{ __('Cognome') }}</label>
                        <input required type="text" class="form-control" id="last_name" v-model="profile.meta.last_name" :placeholder="__('Cognome')">
                     </div>
                  </div>
                  <div class="col-md-6">
                     <!-- first_name -->
                     <div class="mb-3">
                        <label for="first_name" class="form-label">{{ __('Nome') }}</label>
                        <input required type="text" class="form-control" id="first_name" v-model="profile.meta.first_name" :placeholder="__('Nome')">
                     </div>
                  </div>
                  
                  <div class="col-md-12 mb-3">
                     <label>Email:</label> {{ user.user_email }}
                  </div>
                  
                  <div class="col-md-12">
                     <!-- telefono -->
                     <div class="mb-3">
                        <label for="telefono" class="form-label">{{ __('Telefono') }}</label>
                        <inputTel id="telefono" v-model="profile.meta.billing_phone" :placeholder="__('Telefono')" :required="true" />
                        <!-- <input required type="text" class="form-control" id="telefono" v-model="profile.telefono" :placeholder="__('Telefono')"> -->
                     </div>
                  </div>
                  
               </div>
               
               <Errors :errors="meta_errors" v-if="meta_errors.length" />
               
               <button type="submit" class="btn btn-primary px-5 text-uppercase">
                  <span v-if="! saving_meta"> {{ __("Salva") }} </span>
                  <i class="fa fa-spinner rotating" v-else></i>
               </button>
               
            </form>
            
         </div>
         
         <!-- cambia password -->
         
         <div class="box-light p-4 mb-3">
            
            <h3 class="title">{{ __("Cambia password") }}</h3>
            
            <form class="edit-form"  v-on:submit.prevent="change_password()" >
               
               <div class="row">
                  
                  <div class="col-12">
                     <div class="mb-3">
                        <label for="current_password" class="form-label">{{ __('Password attuale') }} *</label>
                        <div class="pass-wrap">
                           <input autocomplete="new-password" v-model="profile.current_password" type="password" :placeholder="__('Password attuale')" id="current_password" class="form-control mb-0" />
                           <span class="switcher" @click="switchPasswordView($event.target)"><i class="fa-regular fa-eye"></i></span>
                        </div>
                     </div>
                  </div>
                  
                  <div class="col-md-6">
                     <div class="mb-3">
                        <label for="password" class="form-label">{{ __('Nuova password') }} *</label>
                        <div class="pass-wrap">
                           <input autocomplete="new-password" v-model="profile.password" type="password" :placeholder="__('Nuova password')" id="password" class="form-control mb-0" />
                           <span class="switcher" @click="switchPasswordView($event.target)"><i class="fa-regular fa-eye"></i></span>
                        </div>
                     </div>
                  </div>
                  
                  <div class="col-md-6">
                     <div class="mb-3">
                        <label for="confirm_password" class="form-label">{{ __('Conferma password') }} *</label>
                        <div class="pass-wrap">
                           <input autocomplete="new-password" v-model="profile.confirm_password" type="password" :placeholder="__('Conferma password')" id="confirm_password" class="form-control mb-0" />
                           <span class="switcher" @click="switchPasswordView($event.target)"><i class="fa-regular fa-eye"></i></span>
                        </div>
                     </div>
                  </div>
                  
                  <div class="requirements">
                     <h5 class="my-3"> {{ __('Consigli sulla password') }} </h5>
                     
                     <ul style="line-height: 2">
                        <li> {{ __('Minimo 8 caratteri') }} </li>
                        <li> {{ __('Usa maiuscole e minuscole') }} </li>
                        <li> {{ __('Almeno un carattere speciale') }} </li>
                     </ul>
                     
                  </div>
                  
               </div>
               
               <Errors :errors="password_errors" v-if="password_errors.length" />
               
               <button type="submit" class="btn btn-primary px-5 text-uppercase">
                  <span v-if="! saving_password"> {{ __("Salva") }} </span>
                  <i class="fa fa-spinner rotating" v-else></i>
               </button>
               
            </form>
            
         </div>
         
      </div>
   </template>
   
   <script>
   import { Utils } from "@/inc/Utils";
   import inputTel from '@/components/inputTel.vue';
   import Errors from '@/components/Errors.vue';
   import { mapActions, mapGetters } from 'vuex';
   
   export default {
      name: 'Profilo',
      mixins: [Utils],
      
      components: {
         inputTel, Errors
      },
      
      computed: {
         ...mapGetters('account', ['user']),
         ...mapGetters('content', ['appData'])
      },
      
      data(){
         return {
            saving_meta: false,
            saving_password: false,
            
            meta_errors: [],
            password_errors: [],
            
            profile: {
               meta: {
                  first_name: '',
                  last_name: '',
                  billing_phone: '',
               },
               current_password: '',
               password: '',
               confirm_password: '',
            }
         }
      },
      
      created(){
         
         this.profile = { ...this.profile, ...JSON.parse(JSON.stringify(this.user)) }
         
      },
      
      methods: {
         
         ...mapActions('account', ['save_user_data']),
         
         user_edit_profile(){
            
            var data = {
               action: 'save_meta',
               meta: this.profile.meta
            };
            
            this.meta_errors = [];
            this.saving_meta = true;
            
            this.save_user_data( data ).then( res => {
               
               if( res.success ){
                  
                  this.meta_errors.push( { type: 'success', text: res.message } );
                  
               }else{
                  
                  this.meta_errors.push( { text: res.message } );
                  
               }
               
               this.saving_meta = false;
               
            })
            
         },
         
         change_password(){
            
            var data = {
               action: 'save_password',
               current_password: this.profile.current_password,
               password: this.profile.password,
               confirm_password: this.profile.confirm_password,
            };
            
            this.password_errors = [];
            this.saving_password = true;
            
            this.save_user_data( data ).then( res => {
               
               
               if( res.success ){
                  
                  this.profile.current_password = '';
                  this.profile.password = '';
                  this.profile.confirm_password = '';
                  
                  this.password_errors.push( { type: 'success', text: res.message } );
                  
               }else{
                  
                  this.password_errors.push( { text: res.message } );
                  
               }
               
               this.saving_password = false;
               
               
            })
            
         },
      },
      
   }
</script>
<style scoped>
form label{
   font-weight: 600;
}
</style>