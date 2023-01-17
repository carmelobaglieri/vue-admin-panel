<template id="search-bar">
   <div class="search-bar d-flex-center-between box-light p-0 pointer">
      <input 
         type="text" 
         :placeholder="inputPlaceholder"
         class="w-100 px-3"

         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         @focus="showData()"

      />

      <div class="search-button d-flex-center-center">
         <i class="fa-regular fa-magnifying-glass" v-if="! filterSearchList.length"></i>
         <i class="fa-regular fa-times" @click="onClose()" v-else></i>
      </div>
   </div>

   <transition name="slide">
      <div class="results box-light" v-if="active">
         <div class="group" v-for="(area, i) in filterSearchList" :key="i">
            <div class="title"><b v-html="area.title"></b></div>
            <div class="item" v-for="(lezione, j) in area.lessons" :key="j">
               <router-link :to="'/account/lezione/'+lezione.id" v-html="lezione.title"></router-link>
            </div>
         </div>
      </div>
   </transition>

</template>

<script>
import { Utils } from "@/inc/Utils"

export default {
   name: 'LmsSearchBar',
   mixins: [Utils],

   emits: ['update:modelValue'],

   props: {
      modelValue: {
         type: String,
         default: ''
      },
      placeholder: {
         type: String,
         default: ''
      },
      list: {
         type: Array,
         default: () => []
      },
      spinner: {
         type: Boolean,
         default: false
      }
   },

   computed: {

      filterSearchList(){

         var list = JSON.parse(JSON.stringify([...this.list]));
         
         if( this.modelValue.length > 1 ){

            return list.filter( area => {

               var lezioni = Object.values(area.lessons).filter( lezione => {
                  return lezione.title.toLowerCase().includes( this.modelValue.toLowerCase())
               });

               if( lezioni.length ){

                  area.lessons = lezioni;
                  return area;

               }else{

                  if( area.title.toLowerCase().includes( this.modelValue.toLowerCase()) ){
                     area.lessons = [];
                     return area;
                  }

               }

               return false
            })

         }

         return list;

      }
   },

   data(){
      return {
         inputPlaceholder: (this.placeholder) ? this.placeholder : this.__('Cerca'),
         active: false
      }
   },

   methods: {
      showData(){
         setTimeout( () => {
            this.active = true
         }, 700 )
      },
      onClose(){
         this.active = false;
         this.$emit('update:modelValue', ''); 
      },

   },
}
</script>
<style scoped>
.search-bar{
   position: relative;
   z-index: 1;
}
.search-button{
   cursor: pointer;
   width: 40px;
   height: 40px;
}
.search-bar input {
   border: none;
   background: transparent;
   line-height: 35px;
   outline: none;
   box-shadow: unset;
   color: var(--bs-primary)
}
.results {
   max-height: 300px;
   overflow: hidden;
   overflow-y: scroll;
   margin-top: -20px;
   z-index: 0;
   padding-top: 40px;
   position: relative;
}
.results .group:not(:last-child){
   margin-bottom: 15px;
}
.results .item, .results .title {
   padding: 5px 0;
   margin-bottom: 5px;
}
.results .item:not(:last-child){
   border-bottom: 1px solid var(--bs-gray-200);
}
.results .item a{
   display: block;
   text-decoration: none;
   color: inherit;
}
</style>