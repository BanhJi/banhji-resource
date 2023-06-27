<template>
  <div class="mb-2">
  <v-btn @click="Back" color="secondary">back</v-btn>


  </div>
</template>
<script setup>
 import { ref } from 'vue'
 import { useRouter } from 'vue-router';
 const router = useRouter();
 const Back = ()  => {
  router.go(-1);
 }
</script>