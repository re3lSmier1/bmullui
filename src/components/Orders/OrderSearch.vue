<script setup>
import OrdersFilter from "@/components/Orders/OrdersFilter.vue";
import {useOrderStore} from "@/stores/OrderStore";
const orderStore = useOrderStore()

function callOrderFilter(){
  alert("Call Order Filter")
}

function GetAll(){
  orderStore.Get()
}
function filterOrders(order){
  console.log(order)
  orderStore.FilterByStatus({Status: order}).then(resp=>{
    self.dialog = false
  })

}

</script>

<template>
  <div>
    <div class="py-3">
      <v-btn size="x-small" color="black" class="mr-2" @click="GetAll()">All</v-btn>
      <v-btn size="x-small" color="amber" class="mr-2" @click="filterOrders(3)">Assigned</v-btn>
      <v-btn size="x-small" color="amber" class="mr-2" @click="filterOrders(7)">Checked Out</v-btn>
      <v-btn size="x-small" color="blue" class="mr-2" @click="filterOrders(2)">Pending</v-btn>
      <v-btn size="x-small" color="pink" class="mr-2" @click="filterOrders(4)">Suspended</v-btn>
      <v-btn size="x-small" color="green" class="mr-2" @click="filterOrders(1)">Complete</v-btn>
      <v-btn size="x-small" color="green" class="mr-2" @click="filterOrders(8)">Cancelled</v-btn>
      <v-btn size="x-small" color="green" class="mr-2" @click="filterOrders(8)">Open</v-btn>
      <v-btn size="x-small" color="green" class="mr-2" @click="filterOrders(10)">Refunded</v-btn>
    </div>
<!--    <v-text-field
        label="Order Search"
        type="input" variant="solo" density="compact" @click="callOrderFilter()"
    ></v-text-field>-->
    <OrdersFilter />
  </div>
</template>

<style scoped>

</style>
