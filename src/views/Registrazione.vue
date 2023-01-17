<template id="registrazione">
   <div class="d-flex align-items-center justify-content-center my-5 px-3 max-600">

      <div class="box-light shadow p-0">

         <div class="box-head text-center">
            <div class="max-300">
               <h2 class="text-white">{{ __('Registrati') }}</h2>
               <p> {{ __("Compila il modulo per registrarti ed accedere al portale.") }} </p>
            </div>
         </div>

         <div class="box-content p-big pt-3">

            <div class="text-center mb-3 max-180">
               <a :href="home_url || '#'">
                  <img src="../assets/images/logo.png" />
               </a>
            </div>

            <ul class="nav nav-tabs top" role="tablist">
               <!-- genitore -->
               <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="genitore-tab" data-bs-toggle="tab" data-bs-target="#genitore" type="button" role="tab" aria-controls="home" aria-selected="true">
                     {{ __('Genitore') }}
                  </button>
               </li>
               <!-- formatore -->
               <!-- <li class="nav-item" role="presentation">
                  <button class="nav-link" id="formatore-tab" data-bs-toggle="tab" data-bs-target="#formatore" type="button" role="tab" aria-controls="formatore" aria-selected="false">
                     {{ __('Formatore') }}
                  </button>
               </li> -->
            </ul>

            <div class="tab-content">
               <!-- genitore -->
               <div class="tab-pane fade show active" id="genitore" role="tabpanel" aria-labelledby="genitore-tab">
                  <form class="login-form"  @submit.prevent="registra_genitore(genitore)">

                     <div class="row">

                        <div class="col-6">
                           <!-- nome -->
                           <div class="mb-3">
                              <label for="nome-gen" class="form-label">{{ __('Nome') }}</label>
                              <input required type="text" class="form-input" id="nome-gen" v-model="genitore.nome" :placeholder="__('Nome')">
                           </div>
                        </div>
                        
                        <div class="col-6">
                           <!-- cognome -->
                           <div class="mb-3">
                              <label for="cognome-gen" class="form-label">{{ __('Cognome') }}</label>
                              <input required type="text" class="form-input" id="cognome-gen" v-model="genitore.cognome" :placeholder="__('Cognome')">
                           </div>
                        </div>
                        
                        <div class="col-6">
                           <!-- email -->
                           <div class="mb-3">
                              <label for="email-gen" class="form-label">{{ __('Email') }}</label>
                              <input required type="text" class="form-input" id="email-gen" v-model="genitore.email" :placeholder="__('Email')">
                           </div>
                        </div>
                        
                        <div class="col-6">
                           <!-- telefono -->
                           <div class="mb-3">
                              <label for="telefono-gen" class="form-label">{{ __('Telefono') }}</label>
                              <inputTel id="telefono-gen" v-model="genitore.telefono" :placeholder="__('Telefono')" :required="true" />
                           </div>
                        </div>
                        
                        <div class="col-6">
                           <!-- data_nascita -->
                           <div class="mb-3">
                              <label for="data_nascita-gen" class="form-label">{{ __('Data di nascita') }}</label>
                              <input required type="date" class="form-input" id="data_nascita-gen" v-model="genitore.data_nascita" :placeholder="__('Data di nascita')">
                           </div>
                        </div>
                        
                        <div class="col-6">
                           <!-- sesso -->
                           <div class="mb-3">
                              <label for="sesso-gen" class="form-label mb-1">{{ __('Sesso') }}</label><br>
                              <div class="form-check form-check-inline">
                                 <input class="form-check-input" type="radio" name="sesso" id="M-gen" value="M" v-model="genitore.sesso">
                                 <label class="form-check-label" for="M">M</label>
                              </div>
                              <div class="form-check form-check-inline">
                                 <input class="form-check-input" type="radio" name="sesso" id="F-gen" value="F" v-model="genitore.sesso">
                                 <label class="form-check-label" for="F">F</label>
                              </div>
                           </div>
                        </div>

                        <div class="col-6">
                           <!-- stato_residenza -->
                           <div class="mb-3">
                              <label for="stato_residenza-gen" class="form-label">{{ __('Stato di residenza') }}</label>
                              <input required type="text" class="form-input" id="stato_residenza-gen" v-model="genitore.stato_residenza" :placeholder="__('Stato di residenza')">
                           </div>
                        </div>
                     
                        <div class="col-6">
                           <!-- comune_residenza -->
                           <div class="mb-3">
                              <label for="comune_residenza-gen" class="form-label">{{ __('Comune di residenza') }}</label>
                              <input required type="text" class="form-input" id="comune_residenza-gen" v-model="genitore.comune_residenza" :placeholder="__('Comune di residenza')">
                           </div>
                        </div>

                     </div>


                     <div class="row">

                        <div class="col-4">
                           <!-- numero_figli -->
                           <div class="mb-3">
                              <label for="numero_figli-gen" class="form-label">{{ __('Numero figli') }}</label>
                              <input required type="number" min="0" max="10" class="form-input" id="numero_figli-gen" v-model="genitore.numero_figli" :placeholder="__('Numero figli')">
                           </div>
                        </div>
                        
                        <!-- eta_figlio -->
                        <div class="col-4" v-for="(el,i) in parseInt(genitore.numero_figli)" :key="i">
                           <div class="mb-3">
                              <label :for="'eta_figlio-'+el+'-gen'" class="form-label">{{ sprintf(__('Età %s° figlio'), [i+1]) }} <span class="required">*</span></label>
                              <input required type="number" min="0" class="form-input" :id="'eta_figlio-'+el+'-gen'" v-model="genitore.eta_figli[i]" :placeholder="sprintf(__('Età %s° figlio'), [el])">
                           </div>
                        </div>

                     </div>

                     <div class="row">
                        
                        <div class="col-12">
                           <!-- codice_formatore -->
                           <div class="mb-3">
                              <label for="codice_formatore-gen" class="form-label">{{ __('Codice Formatore') }}</label>
                              <input type="text" class="form-input" id="codice_formatore-gen" v-model="genitore.codice_formatore" :placeholder="__('Codice Formatore')">
                           </div>
                        </div>
                        
                        <div class="col-12">
                           <!-- password -->
                           <div class="mb-3">
                              <label for="password-gen" class="form-label">{{ __('Password') }}</label>
                              <inputPassword id="password-gen" v-model="genitore.password" :placeholder="__('Password')" :required="true" />
                              <!-- <input required type="password" class="form-input" id="password" v-model="genitore.password" :placeholder="__('Password')"> -->
                           </div>
                        </div>
                        
                        <div class="col-12 mb-3">
                           <!-- privacy -->
                           <div class="form-check">
                              <input required type="checkbox" class="form-check-input" value="true" id="privacy-gen" v-model="genitore.privacy">
                              <label class="form-check-label" for="privacy-gen" v-html="__( strings.privacy_form )"></label>
                           </div>
                        </div>

                        <div class="col-12">
                           <!-- privacy_mkt -->
                           <div class="mb-3 form-check">
                              <input required type="checkbox" class="form-check-input" value="true" id="privacy-mkt-gen" v-model="genitore.privacy_mkt">
                              <label class="form-check-label" for="privacy-mkt-gen" v-html="__( strings.privacy_mkt )"></label>
                           </div>
                        </div>

                     </div>

                     <button type="submit" class="btn btn-primary">
                        {{ __("Registrati") }}
                     </button>

                  </form>
               </div>

               <!-- formatore -->
               <div class="tab-pane fade show" id="formatore" role="tabpanel" aria-labelledby="formatore-tab">
                  <form class="login-form"  @submit.prevent="registra_formatore(formatore)">

                     <div class="row">

                        <div class="col-6">
                           <!-- nome -->
                           <div class="mb-3">
                              <label for="nome-for" class="form-label">{{ __('Nome') }}</label>
                              <input required type="text" class="form-input" id="nome-for" v-model="formatore.nome" :placeholder="__('Nome')">
                           </div>
                        </div>
                        
                        <div class="col-6">
                           <!-- cognome -->
                           <div class="mb-3">
                              <label for="cognome-for" class="form-label">{{ __('Cognome') }}</label>
                              <input required type="text" class="form-input" id="cognome-for" v-model="formatore.cognome" :placeholder="__('Cognome')">
                           </div>
                        </div>
                        
                        <div class="col-6">
                           <!-- email -->
                           <div class="mb-3">
                              <label for="email-for" class="form-label">{{ __('Email') }}</label>
                              <input required type="text" class="form-input" id="email-for" v-model="formatore.email" :placeholder="__('Email')">
                           </div>
                        </div>
                        
                        <div class="col-6">
                           <!-- telefono -->
                           <div class="mb-3">
                              <label for="telefono-for" class="form-label">{{ __('Telefono') }}</label>
                              <inputTel id="telefono-for" v-model="formatore.telefono" :placeholder="__('Telefono')" :required="true" />
                           </div>
                        </div>
                        
                        <div class="col-6">
                           <!-- data_nascita -->
                           <div class="mb-3">
                              <label for="data_nascita-for" class="form-label">{{ __('Data di nascita') }}</label>
                              <input required type="date" class="form-input" id="data_nascita-for" v-model="formatore.data_nascita" :placeholder="__('Data di nascita')">
                           </div>
                        </div>
                        
                        <div class="col-6">
                           <!-- sesso -->
                           <div class="mb-3">
                              <label for="sesso-for" class="form-label mb-1">{{ __('Sesso') }}</label><br>
                              <div class="form-check form-check-inline">
                                 <input class="form-check-input" type="radio" name="sesso" id="M-for" value="M" v-model="formatore.sesso">
                                 <label class="form-check-label" for="M">M</label>
                              </div>
                              <div class="form-check form-check-inline">
                                 <input class="form-check-input" type="radio" name="sesso" id="F-for" value="F" v-model="formatore.sesso">
                                 <label class="form-check-label" for="F">F</label>
                              </div>
                           </div>
                        </div>

                        <div class="col-6">
                           <!-- stato_residenza -->
                           <div class="mb-3">
                              <label for="stato_residenza-for" class="form-label">{{ __('Stato di residenza') }}</label>
                              <input required type="text" class="form-input" id="stato_residenza-for" v-model="formatore.stato_residenza" :placeholder="__('Stato di residenza')">
                           </div>
                        </div>
                     
                        <div class="col-6">
                           <!-- comune_residenza -->
                           <div class="mb-3">
                              <label for="comune_residenza-for" class="form-label">{{ __('Comune di residenza') }}</label>
                              <input required type="text" class="form-input" id="comune_residenza-for" v-model="formatore.comune_residenza" :placeholder="__('Comune di residenza')">
                           </div>
                        </div>

                     </div>

                     <div class="row">
                        <div class="col-6">
                           <!-- ente_appartenenza -->
                           <div class="mb-3">
                              <label for="ente_appartenenza-for" class="form-label">{{ __('Ente di appartenenza') }}</label>
                              <select required class="form-input" v-model="formatore.ente_appartenenza" id="ente_appartenenza-for" v-if="appData.ente_appartenenza">
                                 <option v-for="(key,index) in Object.keys(appData.ente_appartenenza)" :key="index" :value="key">{{ __(appData.ente_appartenenza[key]) }}</option>
                              </select>
                           </div>
                        </div>
                        
                        <div class="col-12">
                           <!-- password -->
                           <div class="mb-3">
                              <label for="password-for" class="form-label">{{ __('Password') }}</label>
                              <inputPassword id="password-for" v-model="formatore.password" :placeholder="__('Password')" :required="true" />
                              <!-- <input required type="password" class="form-input" id="password" v-model="formatore.password" :placeholder="__('Password')"> -->
                           </div>
                        </div>
                        
                        <div class="col-12 mb-3">
                           <!-- privacy -->
                           <div class="form-check">
                              <input required type="checkbox" class="form-check-input" value="true" id="privacy-for" v-model="formatore.privacy">
                              <label class="form-check-label" for="privacy-for" v-html="__( strings.privacy_form )"></label>
                           </div>
                        </div>

                        <div class="col-12">
                           <!-- privacy_mkt -->
                           <div class="mb-3 form-check">
                              <input required type="checkbox" class="form-check-input" value="true" id="privacy-mkt-for" v-model="formatore.privacy_mkt">
                              <label class="form-check-label" for="privacy-mkt-for" v-html="__( strings.privacy_mkt )"></label>
                           </div>
                        </div>

                     </div>

                     <button type="submit" class="btn btn-primary">
                        {{ __("Registrati") }}
                     </button>
                     
                  </form>
               </div>

               <Errors class="mt-4" v-if="errors.length" :errors="errors" />

            </div>

            <hr class="mt-4 mb-3"/>

            <div class="text-center">
               <div class="my-4">
                  <small> {{ __("Se hai già un account accedi con le tue credenziali nell'area login.") }}</small>
               </div>
               <router-link to="/" class="btn btn-primary-light w-100">
                  {{ __('Vai alla login') }}
               </router-link>
            </div>
         </div>
      </div>
      
   </div>
</template>

<script>
import { Utils } from "@/inc/Utils";
import { Vars } from "@/inc/Variables";
import inputTel from '@/components/inputTel.vue';
import inputPassword from '@/components/inputPassword.vue';
import { mapGetters } from 'vuex';
import Errors from '../components/Errors.vue';

export default {
   name: 'Registrazione',
   mixins: [Utils],
   components: {
      inputTel, 
      inputPassword, 
      Errors,
   },

   computed: {
      ...mapGetters( 'content', ['appData','strings'] )
   },

   data(){

      return {
         home_url: Vars.home_url,
         errors: [],
         genitore: {
            nome: '',
            cognome: '',
            email: '',
            telefono: '',
            data_nascita: '',
            sesso: '',
            stato_residenza: '',
            comune_residenza: '',
            numero_figli: 1,
            eta_figli: [],
            codice_formatore: '',
            password: '',
            privacy: false,
            privacy_mkt: false,
         },
         formatore: {
            nome: 'Elisa',
            cognome: 'Salonia',
            email: 'carmelobaglieri@hotmail.it',
            telefono: '+393336051998',
            data_nascita: '1994-02-23',
            sesso: 'F',
            stato_residenza: 'Italia',
            comune_residenza: 'Ragusa',
            ente_appartenenza: '',
            password: 'prova',
            privacy: true,
            privacy_mkt: true,
         },
      }

   },

   methods: {
      
      registra_genitore( data ){

         data.security = this.appData._nonce;

         const vm = this;
         this.errors = [];
         this.reg_in_corso = true;

         this.__post( 
            
            Vars.home_url + '/wp-json/familyskills/v1/registra-genitore', 
            data
         
         ).then(res => {

            vm.errors = this.check_response_errors( res );

            vm.reg_in_corso = false;            

         });

      },

      registra_formatore( data ){

         data.security = this.appData._nonce;

         const vm = this;
         this.errors = [];
         this.reg_in_corso = true;

         this.__post( 
            
            Vars.home_url + '/wp-json/familyskills/v1/registra-formatore', 
            data
         
         ).then(res => {

            vm.errors = this.check_response_errors( res );

            vm.reg_in_corso = false;            

         });
            
      },
   },

   created(){

   }
}
</script>

<style scoped>
.form-label {
   margin-bottom: 0.5rem;
   color: var(--df-gray);
   font-weight: 600;
}
</style>