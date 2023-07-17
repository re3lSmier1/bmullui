<script setup>

import TagCard from "@/components/ProductTags/TagCard.vue";
import {useProductTagStore} from "@/stores/ProductTagStore";
import { VDataTable } from 'vuetify/labs/VDataTable'
import {ref} from "vue";
const itemsPerPage = ref(10)
const headers = ref([
  {
    title: 'Name',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Make', align: 'end', key: 'type' },

  { title: 'Options', align: 'end', key: 'option' },
  //{ title: 'Iron (%)', align: 'end', key: 'iron' },
])
const productTagStore = useProductTagStore()
</script>

<template>
  <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="productTagStore.productTags"
      item-value="name"
      class="elevation-1 pa-5"
  >
    <template v-slot:item.option="{ item }">
      <v-btn size="small" color="red">Delete</v-btn>
    </template>
  </v-data-table>
<!--  <div class="" v-for="item in productTagStore.productTags">
    <TagCard :tag="item" style="margin-top: 7px"/>

  </div>-->
</template>

<style scoped>

</style>
