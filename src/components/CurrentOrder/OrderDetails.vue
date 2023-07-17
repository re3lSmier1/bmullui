<script setup>

import ProductItem from "@/components/CurrentOrder/ProductItem.vue";
import {useOrderStore} from "@/stores/OrderStore";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useProductStore} from "@/stores/ProductStore";
import LineItem from "@/components/CurrentOrder/LineItem.vue";
import AddLineItemModal from "@/components/CurrentOrder/AddLineItemModal.vue";
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
  <div>
    <div class="pa-5" style="height: 500px; background-color: white; border-radius: 7px; overflow-y: scroll">
      <div class="d-flex justify-space-between">
        <div>
          <h4>Order Id: {{ orderId === null ? "" : orderId }}</h4>
        </div>
        <div>
          <h4>Total: {{ orderStore.newOrder?.priceDisplay  }}</h4>
        </div>
      </div>
      <div >
        <div >
          <v-list>
            <v-list-item v-for="(item, i) in orderStore.newOrder?.orderItems">
              <ProductItem :product="item" />
            </v-list-item>
          </v-list>
        </div>
        <div >
          <v-list>
            <v-list-item v-for="item in orderStore.newOrder?.lineItems">
              <LineItem :product="item" />
            </v-list-item>
          </v-list>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div class="d-flex flex-wrap">
        <AddLineItemModal />
        <v-btn class="mr-3 mb-2" color="amber">Clear</v-btn>
        <v-btn class="mr-3 mb-2" color="success">Save</v-btn>
        <v-btn class="mr-3 mb-2" color="red">Discard</v-btn>
        <v-btn class="mr-3 mb-2" color="black">Checkout</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
