<template>
   <div class="errors" v-if="errors && errors.length">
      <div v-for="(error, index) in errors" :class="'error type-' + (error.type || 'error')" :key="index">
         <span v-html="error.text"></span>
      </div>
   </div>
</template>

<script scoped>

export default {
   name: 'Errors',
   props: ['errors']
}
</script>