<template>

   <select v-model="lang" class="form-select w-100" @change="changeLocale($event.target.value)">
      <option value="">{{ __('-- Lingua --') }}</option>
      <option value="it_IT"> {{ __('Italiano') }} </option>
      <option value="en_US"> {{ __('English') }} </option>
   </select>

</template>

<script>

import { defineComponent } from 'vue';
import { Utils } from "@/inc/Utils";
import { mapGetters } from 'vuex';

export default defineComponent({
   name: 'LangSwitcher',
   mixins: [Utils],
   components: {

   },

   computed: {
      ...mapGetters('account', ['locale'] )
   },

   data(){
      return {
         lang: ''
      }
   },
   created(){
      this.lang = this.locale
   },
   /*
   mounted(){
   }*/
});
</script>