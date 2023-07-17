<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiArrowBottomLeft, mdiPlus, mdiClose, mdiArrowRight} from '@mdi/js'
import {ref, watch} from "vue";
import {useOrderStore} from "@/stores/OrderStore";
import {storeToRefs} from "pinia";
import AddItemDiscountModal from "@/components/CurrentOrder/AddItemDiscountModal.vue";
const orderStore = useOrderStore()
const { orderStatus, orderNumber } = storeToRefs(useOrderStore())
const props = defineProps({
  product: {
    type: Object
  }
})
const toggle =  ref(null)
const sku = ref(null)

watch(orderNumber, async (n, o) => {
  await orderStore.OrderDetails()
})

async function NewOrder() {
  await orderStore.Create()
}
async function DeleteOrderItem(id){
  orderStore.DeleteOrderItem(id)
}
async function HideOrder(){
  orderStore.orderStatus = orderStore.orderStatus !== true;
}
async function MoveToCashier(){
  orderStore.PushToCashier()
}
async function GetBySku(sku){
  productStore.ProductsBySku(sku)
}
</script>

<template>

      <v-list-item-title >
        <div class="d-flex justify-space-between">
          <div>
            <div>{{ product?.product?.name }} - <span style="font-size: 12px; font-weight: bold">{{ product?.product.sku }}</span></div>
            <div v-if="product?.isDiscount" style="font-size: 12px">
              Discount: <span style="color: blue">{{ product?.discountDisplay }}</span>
            </div>
          </div>

          <div><span class="font-weight-bold" style="color: #777; font-size: 16px">{{ product?.product?.priceDisplay }}</span></div>
        </div>
      </v-list-item-title>
      <v-list-item-subtitle class="mb-2">
        <div class="d-flex justify-end">
<!--          <v-chip class="mr-2" color="brown" label size="small">Add Discount</v-chip>
          <v-chip class="mr-2" color="red" label size="small">Remove Discount</v-chip>
          <v-chip class="mr-2" color="red" label size="small">Delete</v-chip>-->
          <AddItemDiscountModal :OrderItemId="product.id" />
          <v-btn class="mr-2" color="red" size="x-small" @click="orderStore.RemoveDiscount(product.id)"><svg-icon size="15" type="mdi" :path="mdiClose"></svg-icon> Discount</v-btn>
          <v-btn class="mr-2" color="black" size="x-small" @click="DeleteOrderItem(product?.id)" >Delete</v-btn>
        </div>
      </v-list-item-subtitle>
  <v-divider />

</template>

<style scoped>

</style>
