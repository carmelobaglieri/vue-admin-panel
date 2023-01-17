<template>

  <div v-if=" !is_logged ">

    <Registrazione v-if="$route.path == '/registrazione'"/>

    <Login v-else/>

  </div>

  <div v-else>

    <Sidebar />

    <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">

          <Header />

          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <div class="container-fluid py-4" :key="route.fullPath">  
                <component :is="Component"></component>
              </div>
            </transition>
          </router-view>

        </div>
    </div>

    <Modal />

  </div>


  <div class="overlay-loading" v-if="page_loading">
      <div class="spinner">
        <i class="fa fa-spinner rotating"></i>
      </div>
  </div> 


</template>


<style lang="scss">
  @import "@/assets/fonts/fontawesome-pro-6/all.min.scss";
  @import "@/assets/css/style.scss";
</style>

<script>
import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Utils } from '@/inc/Utils';

import Header from "@/layout/Header.vue";
import Sidebar from "@/layout/Sidebar.vue";
import Modal from "@/components/Modal.vue";
import Login from "@/views/Login.vue";
import Registrazione from "./views/Registrazione.vue";

export default defineComponent({

  name: "VueApp",
  mixins: [ Utils ],

  components: {
    Header,
    Sidebar,
    Modal,
    Login,
    Registrazione
  },

  computed: {
    ...mapGetters('account', ['is_logged', 'user'] ),
    ...mapGetters('content', ['page_loading'] ),
  },

  methods: {
    ...mapActions( 'content', ['getStrings','getAppData'] ),
    ...mapMutations( 'content', ['setPageLoading'] ),
    ...mapActions( 'account', ['get_user','getGenitori'] ),
  },

  created(){

    var p1 = this.getStrings();
    var p2 = this.getAppData();
    var p3 = this.get_user();


    this.setPageLoading(true);
    
    Promise.all([ p1, p2, p3 ]).then( res => {
      this.setPageLoading(false);
    })

  }

})
</script>