<script setup>
import BackAppBar from "@/components/BackAppBar.vue";

import OrderSearch from "@/components/Orders/OrderSearch.vue";
import OrderTable from "@/components/Orders/OrderTable.vue";
import OrderDetails from "@/components/Orders/OrderDetails.vue";
import router from "@/router";
import {useOrderStore} from "@/stores/OrderStore";
const orderStore = useOrderStore()

async function NewOrder() {
  orderStore.Create().then(response => {
    router.push("/current-order")
  })
}

/*function GenerateNewOrder(){
  orderStore.Create().then(response => {
    router.push("/csa/create-order")
  })
}*/

</script>

<template>
  <BackAppBar />
  <div class="pa-5">
    <div class="d-flex justify-space-between mt-2">
    <div>
      <h2>All Orders</h2>
    </div>
      <div>
        <v-btn color="primary" variant="elevated" @click="NewOrder()">New Order</v-btn>
      </div>
    </div>
    <br>
    <OrderSearch />
    <br>
    <OrderTable />

  </div>
</template>

<style scoped>

</style>
