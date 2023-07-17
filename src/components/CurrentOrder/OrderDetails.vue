<script setup>

import ProductItem from "@/components/CurrentOrder/ProductItem.vue";
</script>

<template>
  <div>
    <div class="pa-5" style="height: 500px; background-color: white; border-radius: 7px">
      <div class="d-flex justify-space-between">
        <div>
          <h4>Order Id: Number</h4>
        </div>
        <div>
          <h4>Total: -- Total --</h4>
        </div>
      </div>
      <div>
        <ProductItem />
      </div>
    </div>
    <div class="mt-3">
      <div class="d-flex flex-wrap">
        <v-btn class="mr-3">Add Line Item</v-btn>
        <v-btn class="mr-3">Clear</v-btn>
        <v-btn class="mr-3">Save</v-btn>
        <v-btn class="mr-3">Discard</v-btn>
        <v-btn class="mr-3">Checkout</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
