<script setup>

import { VDataTable } from 'vuetify/labs/VDataTable'
import {ref} from "vue";

const itemsPerPage = ref(5)
const headers = ref([
  {
    title: 'Name',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Order No.', align: 'end', key: 'calories' },
  { title: 'Price', align: 'end', key: 'fat' },
  { title: 'Status', align: 'end', key: 'carbs' },
  { title: 'Options', align: 'end', key: 'protein' },
  //{ title: 'Iron (%)', align: 'end', key: 'iron' },
])
const desserts = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0',
  },
])
</script>

<template>
  <div class="">

    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="desserts"
        item-value="name"
        class="elevation-1 pa-5"
    >
      <template v-slot:item.calories="{ item }">
        <v-chip color="primary">
          {{ item.columns.calories }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>

</style>
