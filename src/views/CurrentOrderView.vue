<script setup>

import BackAppBar from "@/components/BackAppBar.vue";
import ProductsFilter from "@/components/Products/ProductsFilter.vue";
import ProductCard from "@/components/Products/ProductCard.vue";
import OrderDetails from "@/components/CurrentOrder/OrderDetails.vue";
</script>

<template>
  <BackAppBar />
  <div class="pa-5">
    <v-row >
      <v-col cols="12" md="7">
        <ProductsFilter />
        <ProductCard />
      </v-col>
      <v-col cols="12" md="5">
        <OrderDetails />
      </v-col>
    </v-row>
    </div>

</template>

<style scoped>

</style>
