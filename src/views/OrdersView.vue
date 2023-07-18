<script setup>
import BackAppBar from "@/components/BackAppBar.vue";

import OrderSearch from "@/components/Orders/OrderSearch.vue";
import OrderTable from "@/components/Orders/OrderTable.vue";
import OrderDetails from "@/components/Orders/OrderDetails.vue";

async function NewOrder() {
  await orderStore.Create()
}

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
