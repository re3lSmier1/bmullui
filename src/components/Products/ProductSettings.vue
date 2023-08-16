<script setup>
import {useProductStore} from "@/stores/ProductStore";
import {useRoute} from "vue-router";

const productStore = useProductStore()
const route = useRoute()
function MarkAvailable(){
  productStore.MarkAvailable(route.query.id)
}
function MarkUnAvailable(){
  productStore.MarkUnavailable(route.query.id)
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <br>
      <div>
        <v-btn class="mr-3" color="black" @click="MarkAvailable()" size="small">Mark Available</v-btn>
        <v-btn class="mr-3" color="brown" @click="MarkUnAvailable()" size="small">Mark Unavailable</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>