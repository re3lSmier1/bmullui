<script setup>

import { VDataTable } from 'vuetify/labs/VDataTable'
import {onMounted, ref} from "vue";
import {useOrderStore} from "@/stores/OrderStore";

const orderStore = useOrderStore()
onMounted(() =>{
  orderStore.All()
})

const itemsPerPage = ref(25)
const headers = ref([
  {
    title: 'Name',
    align: 'start',
    sortable: false,
    key: 'orderName',
  },
  { title: 'Order No.', align: 'end', key: 'orderNumber' },
  { title: 'Price', align: 'end', key: 'totalPriceDisplay' },
  { title: 'Status', align: 'end', key: 'statusDisplay' },
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
        :items="orderStore.orders"
        item-value="id"
        class="elevation-1 pa-5"
    >
      <template v-slot:item.calories="{ item }">
        <v-chip color="primary">
          {{ item.columns.calories }}
        </v-chip>
      </template>
      <template v-slot:item.protein="{item}">
        <div class="text-center">
          <v-btn color="primary" size="small">
            View
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>

</style>
