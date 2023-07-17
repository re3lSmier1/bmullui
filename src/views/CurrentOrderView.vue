<script setup>

import BackAppBar from "@/components/BackAppBar.vue";
import ProductsFilter from "@/components/Products/ProductsFilter.vue";
import ProductCard from "@/components/Products/ProductCard.vue";
import OrderDetails from "@/components/CurrentOrder/OrderDetails.vue";
import {useProductStore} from "@/stores/ProductStore";
import ProductToCartCard from "@/components/Products/ProductToCartCard.vue";
import {onMounted, ref} from "vue";
import {useOrderStore} from "@/stores/OrderStore";
import {storeToRefs} from "pinia";
const productStore = useProductStore()
const orderStore = useOrderStore()
const orderId = ref(null)
const { orderStatus, orderNumber } = storeToRefs(useOrderStore())

onMounted(()=> {
  orderId.value = localStorage.getItem("OrderId")
  productStore.Get()
  orderStatus ? orderStore.OrderDetails() : console.log()
})
</script>

<template>
  <BackAppBar />
  <div class="pa-5">
    <v-row >
      <v-col cols="12" md="7">
        <ProductsFilter />
        <div v-for="item in productStore?.products" :key="item.name" >
          <ProductToCartCard :product="item" style="margin-top: 7px"/>
        </div>
      </v-col>
      <v-col cols="12" md="5">
        <OrderDetails :orderId="orderId" />
      </v-col>
    </v-row>
    </div>

</template>

<style scoped>

</style>
