<script setup>

import { VDataTable } from 'vuetify/labs/VDataTable'
import {onMounted, ref} from "vue";
import {useOrderStore} from "@/stores/OrderStore";
import {storeToRefs} from "pinia";
import OrderDetails from "@/components/Orders/OrderDetails.vue";
import RefundOrderModal from "@/components/Orders/RefundOrderModal.vue";
import router from "@/router";

const orderStore = useOrderStore()
const modalStatus = ref(false)
const orderId = ref(null)
const { OrderIdForView } = storeToRefs(orderStore)

function CallOrderDetails(order_id, status){
  //console.log(order_id)
  this.OrderIdForView = order_id
  this.orderId = order_id
  this.modalStatus = status
  orderStore.statusForOrderDetailModal = status
}

async function MakeCurrentOrder(id) {
  await localStorage.setItem("OrderId", id)
  orderStore.orderNumber = id
  await orderStore.OrderDetails()
  await router.push("/current-order")
}

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
  { title: 'Order No.', align: 'center', key: 'orderNumber' },
  { title: 'Price', align: 'center', key: 'totalPriceDisplay' },
  { title: 'Status', align: 'center', key: 'statusDisplay' },
  { title: 'Options', align: 'center', key: 'option' },
 /* { title: '', align: 'end', key: 'select' },*/
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
      <template v-slot:item.totalPriceDisplay="{ item }">
<!--        {{ item }}-->
        <v-chip color="primary">
          {{ item.columns.totalPriceDisplay }}
        </v-chip>
      </template>
      <template v-slot:item.option="{item}">
        <div class="text-center">
<!--          {{ item }}-->
          <v-btn color="primary" size="small" class="mr-2" @click="CallOrderDetails(item.raw.id, true)">
            View
          </v-btn>
          <v-btn color="primary" size="small" variant="text" @click="MakeCurrentOrder(item.raw.id)">
            Select
          </v-btn>
        </div>
      </template>
<!--      <template v-slot:item.select="{item}">
        <div class="text-center">
&lt;!&ndash;          {{ item }}&ndash;&gt;

        </div>
      </template>-->

    </v-data-table>
    <OrderDetails :OrderId="orderId" :status="modalStatus" />
    <RefundOrderModal />
  </div>
</template>

<style scoped>

</style>
