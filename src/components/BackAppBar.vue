<script setup>
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiArrowBottomLeft, mdiArrowLeft, mdiArrowRight} from '@mdi/js'
const route = useRoute()
const props = defineProps({

})

onMounted(() => {
  console.log(route.path)
})
</script>

<template>
  <v-app-bar
      color="primary"
      density="compact"
  >
    <template v-slot:prepend>
      <v-btn to="/">
        <svg-icon type="mdi" :path="mdiArrowLeft"></svg-icon>
      </v-btn>
    </template>



    <!--    <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>-->
  </v-app-bar>
</template>

<style scoped>

</style>
