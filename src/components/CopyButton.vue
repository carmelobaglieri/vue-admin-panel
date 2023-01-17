<template>
   
   <button :class="'btn '+classes" type="button" @click="copyToClipboard(value, $event)" data-bs-toggle="tooltip" data-bs-placement="bottom" title :data-bs-original-title="__('Copiato!')" data-bs-trigger="click">
      <i class="fa-solid fa-copy"></i>
   </button>

</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { Utils } from "@/inc/Utils"

export default defineComponent({
   name: 'CopyButton',
   props: ['classes','value'],
   props: {
      classes: {
         type: String,
         default: 'btn-primary'
      },
      value: {
         type: String,
         default: ''
      }
   },
   mixins: [ Utils ],
   
   methods: {
      copyToClipboard( value, event ) {
         navigator.clipboard.writeText(value);
      }
   }

})
</script>
