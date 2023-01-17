<template>
   <div id="header" class="p-3 d-md-none">

      <div class="d-flex align-items-center justify-content-between">

         <div class="left d-flex-center-start">

            <router-link to="/" class="loghi d-flex align-items-center">
               <img src="../assets/images/logo.png" />
            </router-link>

            <!-- <h1 class="h4 text-primary mb-1 fw-bold">{{ $route.name }}</h1> -->

            <!-- <router-link :to="(is_logged ? '/account' : '/login')" class="login">

               <div :class="'d-flex-center-center icon ' + (is_logged ? 'logged' : '') ">
                  <span to="/account" class="account-button" v-if="is_logged">
                     <i class="fa-regular fa-user-check"></i>
                  </span>
                  
                  <span to="/login" class="account-button" v-else>
                     <i class="fa fa-user-large"></i>
                  </span>
               </div>

               <div class="ciao ms-2">
                  <div><small>{{ __('Ciao,') }}</small></div>
                  <div v-if="is_logged && user.meta"><strong>{{ user.meta.first_name }}</strong></div>
                  <div v-else><small>{{ __('clicca qui per accedere') }}</small></div>
               </div>
            </router-link> -->
         </div>

         <div class="right d-flex-center-center">           

            <button id="sidebarToggleTop" class="btn border-0 ms-3" type="button">
               <i class="fa-solid fa-bars"></i>
            </button>
            
         </div>

      </div>

   </div>
</template>

<script scoped>
import { defineComponent } from "@vue/runtime-core";
import { Utils } from '@/inc/Utils';

export default defineComponent({

   mixins: [ Utils ],

   computed: {
   },

   data(){
      return {
         cart: [],
         is_logged: false,
         user: {}
      }
   }

})
</script>

<style scoped lang="scss">
#header {   
   width: 100%;
   background: #fff;
   box-shadow: 0 0.1rem 1rem rgb(0 0 0 / 8%);
   height: 65px;
   z-index: 2;
   position: relative;
}
#header.fixed{
   position: fixed;
   top: 0;
   left: 0;
   z-index: 10;
}
a.login{
   display: flex;
   align-items: center;
   text-decoration: none;
   color: inherit;
}
.icon{
   color: var(--bs-gray-600);
   width: 29px;
   height: 29px;
   line-height: 27px;
   text-align: center;
   border: 1px solid var(--bs-gray-600);
   display: inline-block;
   border-radius: 50%;
   font-size: 13px;
}
.icon.logged{
   color: white;
   background-color: var(--bs-gray-600);
}
#side-panel{
   color: inherit;
   width: 30px;
   line-height: 30px;
   text-align: center;
}
.loghi img{
   height: 30px;
}
</style>