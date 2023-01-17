<template>
   
   <div class="row align-items-center">
      <!-- left -->
      <div class="col-lg-9 col-md-8">

         <div id="filterbar" class="w-100">

            <!-- filtri -->
            <div class="filtri mb-3" v-if="Object.keys(filters).length">
               <div :class="'filtro ' + key" v-for="(key, i) in Object.keys(filters)" :key="i">
                  <label class="fw-bold mb-2" v-if="filters[key].label">{{ filters[key].label }}</label>
                  <select class="form-select" v-if="filters[key].options" v-model="filterData[filters[key].filterKey]">
                     <option value="" v-if="filters[key].first_label">{{ filters[key].first_label }}</option>
                     <option value="" v-else>{{ __('-- Seleziona --') }}</option>
                     <option v-for="(option, j) in filters[key].options" :value="option.value">{{ option.label }}</option>
                  </select>
               </div>
            </div>

            <!-- search -->
            <div class="search-bar d-flex-center-between form-input p-0 pointer mb-3">
               <input 
                  type="text" 
                  :placeholder="inputPlaceholder"
                  class="w-100 px-3"

                  :value="modelValue"
                  @input="$emit('update:modelValue', $event.target.value)"
                  @focus="showData()"

               />

               <div class="search-button d-flex-center-center">
                  <i class="fa-regular fa-magnifying-glass" v-if="! modelValue.length"></i>
                  <i class="fa-regular fa-times d-flex-center-center w-100 h-100" @click="onClose()" v-else></i>
               </div>
            </div>
            
            <!-- actions -->
            <div class="actions mb-3">
               <button class="btn btn-danger text-white fa fa-trash" @click="resetFilters()"></button>
            </div>

         </div>

      </div>

      <!-- right -->
      <div class="col-lg-3 col-md-4">
         <div class="text-md-end mb-3">
            <button class="btn btn-primary additem" @click="$emit('addItem')"> <i class="fa fa-plus me-2"></i> {{ __('Aggiungi') }}</button>
         </div>
      </div>

   </div>

   <!-- results -->
   <div class="table-responsive">

      <table class="table align-middle" v-if="Array.isArray(list) && list.length && itemComponent">

         <thead v-if="Object.keys(head).length" class="align-middle">
            <tr>
               <th v-for="(key, i) in Object.keys(head)" :key="i" :class="key">
                  <div v-html="head[key].label"></div>
               </th>
            </tr>
         </thead>

         <tbody>
            <Component
               v-bind:is="itemComponent" 
               v-for="item in filterSearchList" 
               :key="item.ID"
               :item="item"
            ></Component>
         </tbody>

      </table>
   </div>

</template>

<script>
import { Utils } from "@/inc/Utils"

export default {
   name: 'DataTable',
   mixins: [Utils],

   emits: ['update:modelValue', 'addItem','onFilterData'],

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
         /* type: Array,
         default: () => [] */
      },
      filters: {
         type: Object, Array,
         default: () => { return {} }
      },
      head: {
         type: Object,
         default: () => { return {} }
      },
      searchKeys: {
         type: Array,
         default: () => []
      },
      itemComponent: {
         type: String,
         default: ''
      }
   },

   computed: {

      filterSearchList(){

         var l = JSON.parse(JSON.stringify([...this.list]));

         if( Object.keys(this.filterData).length ){
            l = [...l].filter( item => {
               return Object.keys(this.filterData).map( key => {

                  if( Array.isArray(item[key]) ){
                     return this.filterData[key] ? item[key].includes(this.filterData[key]) : true
                  }
                  
                  return this.filterData[key] ? this.filterData[key] == item[key] : true
               }).includes( true );
            })
         }
         
         if( this.modelValue.length > 3 ){

            l = l.filter( item => {

               return this.searchKeys.map( itemKey => {

                  return this.modelValue.trim().toLowerCase().split(' ').map( keyword => {

                     //console.log(this.modelValue, keyword, itemKey)
                     
                     var field = '';

                     if( Array.isArray(item[itemKey]) ){

                        field = item[itemKey].join(' ');
                     
                     } else {
                     
                        field = item[itemKey] || '';
                     
                     }

                     //console.log(field)

                     return field.toLowerCase().includes( keyword )
                  
                  }).includes( true );

               }).includes( true );
               
            });

         }
         
         this.$emit( 'onFilterData', l );
         return l;

      }
   },

   data(){
      return {
         inputPlaceholder: (this.placeholder) ? this.placeholder : this.__('Cerca'),
         filterData: {}
      }
   },

   methods: {
      
      showData(){
      },

      onClose(){
         this.$emit('update:modelValue', ''); 
      },

      resetFilters(){
         this.$emit('update:modelValue', '')
         
         Object.keys( this.filterData ).forEach( key => {
            this.filterData[key] = ''
         })
      }

   },

   created(){
      if( Object.keys(this.filters).length ){

         Object.values(this.filters).forEach( f => {
            var obj = {}
            obj[f.filterKey] = f.value
            this.filterData = { ...obj, ...this.filterData }
         })

      }
   }

   /* mounted(){
   } */
}
</script>

<style>
.search-bar{
   position: relative;
   z-index: 1;
   max-width: 500px;
   width: 100%;
   border: 1px solid gainsboro;
   background: #fff;
   border-radius: 20px;
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
}

.filtri{
   display: inline-block;
}
.filtro{
   float: left;
   min-width: 120px;
}
.filtro:not(:first-child){
   margin-left: 15px;
}

.additem{
   line-height: 37px;
   padding-top: 0;
   padding-bottom: 0;
}

@media (min-width: 576px){
   #filterbar{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      
   }
   #filterbar > *:not(:first-child){
      margin-left: 15px;
   }
}

</style>