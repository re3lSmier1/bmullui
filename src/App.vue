<script setup>
import {computed} from "vue";
import {RouterView, useRoute} from 'vue-router'
const default_layout = "default";
const route = useRoute();
import HelloWorld from './components/HelloWorld.vue'


// a computed ref
const layout = computed(() => {
  return (route.meta.layout || default_layout) + "-layout"
  //return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <component :is="layout">
    <RouterView :layout.sync="layout"/>
  </component>

</template>

<style scoped>

</style>
