<template>
   <transition name="modal-fade" v-show="modal.isVisible">
      <div :class="'modale-wrap' + (modal.isTutorial ? ' tutorial' : '' )">
         <div 
            class="modale shadow-lg d-flex flex-column" 
            :style="(modal.background ? 'background-image: url('+modal.background+')' : '')">

            <div class="head text-end">
               <div class="close d-inline-flex align-items-center justify-content-center m-2" 
                  @click="close"
               >
                  <i class="fa-light fa-times"></i>
               </div>
            </div>
               
            <div class="inner h-100">
               <div v-html="modal.head"></div>
               <div class="content" v-if="! modal.bodyComponent" v-html="modal.body"></div>
               <div class="content" v-if=" modal.bodyComponent && modal.body.tag ">
                  <Component v-bind:is="modal.body.tag" :data="modal.body.data ? modal.body.data : {}"></Component>
               </div>
            </div>

            <div class="foot p-3 d-flex-center-center">
               <button class="btn btn-primary me-2" v-if="modal.onConfirm" @click="confirm">{{ modal.confirmText }}</button>
               <span class="text-decoration-uppercase pointer" @click="close">Chiudi</span>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import { Utils } from '@/inc/Utils';
import { mapGetters, mapMutations } from 'vuex';

export default {
   name: 'Modal',
   mixins: [Utils],

   computed: {
      ...mapGetters('content', ['modal'])
   },

   methods: {

      ...mapMutations('content', ['destroyModal']),

      close() {

         if( this.modal.onClose ){
            this.modal.onClose.call();
         }
         this.destroyModal();
         this.$emit('close');

      },

      confirm() {

         if( this.modal.onConfirm ){
            this.modal.onConfirm.call();
         }
         
         this.$emit('confirm');
         
      },


   },
};
</script>

<style>
.modale-wrap {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 10;
   padding: 1rem;
   background-color: rgba(0,0,0,.25);
   display: flex;
   align-items: center;
   justify-content: center;
}
.modale{
   max-height: 100%;
   background: #fff;
   background-size: cover;
   background-position: top center;
   position: relative;
   max-width: 700px;
   margin: 0 auto;
}
.modale .close{
   width: 32px;
   height: 32px;
   font-size: 27px;
   cursor: pointer;
}
.modale .inner {
   overflow-x: hidden;
   padding-right: 1rem;
   padding-left: 1rem;
}
.modal-fade-enter,
.modal-fade-leave-to {
   opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
   transition: opacity .25s ease;
}

.modale-wrap.tutorial{
   padding: 0;
}
.tutorial .modale .head {
   position: absolute;
   right: 0;
   top: 0;
}
.tutorial .modale .inner{
   padding: 0
}
.tutorial .modale .close{
   background: var(--bs-secondary);
   color: white;
}
.tutorial .modale .foot {
   display: none;
}
</style>
