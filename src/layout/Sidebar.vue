<template>

   <div id="sidebar" class="pe-3 d-flex flex-column justify-content-between">

      <div class="mb-3">
      
         <div class="d-flex-center-center p-2">
            <a href="/">
               <img src="../assets/images/logo.png" style="max-height:50px" />
            </a>
         </div>

         <!-- <hr class="sidebar-divider my-0" /> -->

         <nav class="navbar p-0">
            
            <router-link to="/" 
               :class="'nav-link '+ (is_active() ? 'active' : '')">
               <i class="fa-regular fa-gauge-simple-max me-2"></i> <span>{{ __('Bacheca')}} </span>
            </router-link>

         </nav>         

         <!-- <router-link to="/reports" 
            :class="'nav-link '+ (is_active('reports') ? 'active' : '')">
            <i class="fa-regular fa-file-chart-column me-2"></i> <span>{{ __('Reports')}} </span>
         </router-link> -->

         <nav class="navbar p-0">

            <router-link to="/profilo" 
               :class="'nav-link '+ (is_active('profilo') ? 'active' : '')">
               <i class="far fa-user-circle me-2"></i> <span>{{ __('Profilo')}} </span>
            </router-link>

            <button @click="logoutUser()" class="nav-link pointer border-0">
               <i class="far fa-arrow-right-from-line me-2"></i> <span>{{ __('Esci')}} </span>
            </button>

         </nav>
      </div>


      <div>
         
         <div class="w-100 px-3 mb-3">
            <small class="d-block mb-1">{{ __('Cambia lingua') }}</small>
            <LangSwitcher />
         </div>

      </div>

      <!-- impostazioni -->
      <!-- <div class="accordion accordion-flush w-100" id="nav-impostazioni">
         <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingImpostazioni">
               <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseImpostazioni" aria-expanded="false" aria-controls="flush-collapseImpostazioni">
               <i class="far fa-tools me-2"></i> <span>{{ __('Impostazioni')}} </span>
               </button>
            </h2>
            <div id="flush-collapseImpostazioni" class="accordion-collapse collapse" aria-labelledby="flush-headingImpostazioni" data-bs-parent="#nav-impostazioni">
               <router-link  to="/comuni" 
                  :class="'nav-link '+ (is_active('comuni') ? 'active' : '')">
                  <i class="far fa-check me-2"></i> <span>{{ __('Comuni')}} </span>
               </router-link>
            </div>
         </div>
      </div> -->
      
   </div>
</template>

<script>
import $ from 'jquery';
import { defineComponent } from 'vue';
import { Utils } from "@/inc/Utils";
import { Vars } from "@/inc/Variables";
import { mapActions, mapGetters } from 'vuex';
import LangSwitcher from "@/components/LangSwitcher";

export default defineComponent({
   name: 'Sidebar',
   mixins: [Utils],
   components: {
      LangSwitcher
   },

   computed: {
      ...mapGetters( 'account', ['user'] ),
      ...mapGetters( 'content', ['appData'])
   },

   data(){
      return {
         logout_url: '/logout',
         homeurl: Vars.home_url
      }
   },

   watch:{
      $route (to, from){
         $('body').removeClass('sidebar-toggled');
      }
   },

   methods: {

      ...mapActions( 'account', ['logout'] ),

      is_active( name = '' ){
         return this.$route.path == '/'+name
      },

      logoutUser(){
         this.logout();
      }
   },
   /*created(){

   },
   */
   mounted(){
      this.initSidebar()
   }
});
</script>

<style scoped>
.nav-link, .accordion-button {
   color: var(--bs-gray-900);
   background: transparent;
   display: block;
   width: 100%;
   text-align: left;
   padding: 1rem;
   font-size: 1rem;
   border-top-right-radius: 25px;
   border-bottom-right-radius: 25px;
}
.nav-link:hover {
   color: var(--bs-gray-900);
   background: var(--bs-gray-200);
}
@media (min-width: 768px){
}
.accordion-button:focus{
   box-shadow: unset;
}
.nav-link.router-link-active, .accordion-collapse .nav-link.router-link-active{
   background: var(--bs-primary);
   color: white;
}
.accordion-item{
   background: transparent;
}
.accordion-collapse .nav-link{
   padding-left: 1rem;
   background: var(--bs-gray);
   color: var(--bs-gray-600)
}
</style>
