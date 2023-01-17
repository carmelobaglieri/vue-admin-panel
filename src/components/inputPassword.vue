<template>
   <div :class="'input-group password ' + wrapClass">
      <input 
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"

         :type="inputType" 
         :id="id" 
         :name="name" 
         :placeholder="placeholder" 
         :class="styleClasses" 
         :required="required" 
         :readonly="readonly" />

         <span class="input-group-text" @click="switchType">
            <i class="fa-regular fa-eye" v-if="inputType == 'password'"></i>
            <i class="fa-regular fa-eye-slash" v-else></i>
         </span>
   </div>
</template>

<script>
import { Utils } from "@/inc/Utils";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
   name: 'inputPassword',
   mixins: [Utils],

   emits: ['update:modelValue'],

   props: {

      modelValue: {
         type: String,
         default: 'password'
      },

      type: {
         type: String,
         default: 'password'
      },
      id: {
         type: String,
         default: 'password'
      },
      name: {
         type: String,
         default: 'password'
      },
      placeholder: {
         type: String,
         default: 'Password'
      },
      styleClasses: {
         type: String,
         default: 'form-control'
      },
      required: {
         type: Boolean,
         default: true
      },
      readonly: {
         type: Boolean,
         default: false
      },
      wrapClass: {
         type: String,
         default: ''
      },
   },

   data(){
      return {
         inputType: this.type
      }
   },

   methods: {
      switchType(){
         this.inputType = (this.inputType == 'text') ? 'password' : 'text';
      }
   }

});
</script>

<style scoped>
input {
   border: none
}
.input-group{
   border-radius: 10px;
   overflow: hidden;
   border: 1px solid var(--bs-gray-200);
}
.input-group-text {
   background: transparent;
   cursor: pointer;
   border: none;
}
i.fa-eye-slash {
    position: relative;
    right: -1px;
}
</style>