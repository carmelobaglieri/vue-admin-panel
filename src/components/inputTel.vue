<template>
   <vue-tel-input 
      :id="id" 

      :value="modelValue"
      v-model="value"
      @input="$emit('update:modelValue', $event.target.value)"

      defaultCountry="IT"
      :inputOptions="inputOptions"
      :dropdownOptions="dropdownOptions"
      :mode="mode"

   ></vue-tel-input>
</template>

<script>
import { ref } from 'vue';
import { Utils } from "@/inc/Utils";
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

export default {
   name: 'inputTel',
   mixins: [Utils],
   components: {
      VueTelInput
   },

   emits: ['update:modelValue'],

   props: {
      type: {
         type: String,
         default: 'tel'
      },
      id: {
         type: String,
         default: 'phone'
      },
      name: {
         type: String,
         default: 'phone'
      },
      modelValue: {
         type: String,
         default: ''
      },
      placeholder: {
         type: String,
         default: ''
      },
      styleClasses: {
         type: String,
         default: ''
      },
      required: {
         type: Boolean,
         default: false
      },
      readonly: {
         type: Boolean,
         default: false
      },
      mode: {
         type: String,
         default: 'international'
      },
   },

   
   data(){
      return {

         value: this.modelValue,
         
         dropdownOptions: {
            disabled: false,
            showDialCodeInList: true,
            showDialCodeInSelection: false,
            showFlags: true,
            showSearchBox: false,
            tabindex: 0,
            width: 'calc(100vw - 40px)',
         },
         inputOptions: {
            autocomplete: 'off',
            autofocus: false,
            'aria-describedby': this.__('Telefono'),
            id: this.id ? this.id : '',
            maxlength: 25,
            name: this.name ? this.name : 'telefono',
            showDialCode: false,
            placeholder: this.placeholder ? this.placeholder : this.__('Telefono'),
            readonly: this.readonly,
            required: this.required,
            tabindex: 0,
            type: this.type ? this.type : 'tel',
            styleClasses: this.styleClasses
         }
      }
   },

   methods: {

   },
   
}
</script>
<style>
.vti__input{
  padding: 10px 15px 10px 0;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}
.vti__dropdown{
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}
.vti__dropdown-list {
   border-color: var(--bs-gray-200)!important;
   /* width: calc(100vw - 40px)!important; */
   border-radius: 10px;
}
.vti__dropdown-item strong {
   font-weight: 600;
   margin-left: 7px;
}
</style>