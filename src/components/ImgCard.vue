<template>
  <v-card
    class="mx-auto" color="#F5F5F5"
  >
    <v-img
      :src="'https://bmull.axium.io' + source.link"

      cover
    ></v-img>



    <v-card-actions >
      <v-spacer></v-spacer>

      <v-btn size="small" color="surface-variant" variant="text" >View</v-btn>

      <v-btn size="small" color="red" variant="text" @click="DeletePhoto(source.id)">Delete</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { ref } from "vue";
  import {useProductStore} from "@/stores/ProductStore";
  const pStore = useProductStore()
  const show = ref(false)

  const props = defineProps({
    source: {
      required: true
    }
  })
  function DeletePhoto(id){
    pStore.DeletePhotos(id)
  }
</script>

<style scoped>

</style>
