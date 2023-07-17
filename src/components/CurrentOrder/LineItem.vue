<script setup>

import {mdiClose, mdiPlus} from "@mdi/js";
import {useOrderStore} from "@/stores/OrderStore";
const orderStore = useOrderStore()

const props = defineProps({
  product: {
    type: Object
  }
})

async function DeleteLineItem(id){
  await orderStore.DeleteLineItem(id)
}

</script>

<template>

        <div class="d-flex justify-space-between">
          <div>{{ product?.name  }}</div>
          <div><span class="font-weight-bold" style="color: #777; font-size: 16px">{{ product?.priceDisplay }}</span></div>
        </div>
        <v-list-item-subtitle class="mb-2">
          <div class="d-flex justify-end">
            <!--          <v-chip class="mr-2" color="brown" label size="small">Add Discount</v-chip>
                      <v-chip class="mr-2" color="red" label size="small">Remove Discount</v-chip>
                      <v-chip class="mr-2" color="red" label size="small">Delete</v-chip>-->
<!--            <v-btn class="mr-2" color="amber" size="x-small"><svg-icon type="mdi" size="15" :path="mdiPlus"></svg-icon>Discount</v-btn>
            <v-btn class="mr-2" color="red" size="x-small"><svg-icon size="15" type="mdi" :path="mdiClose"></svg-icon> Discount</v-btn>-->
            <v-btn class="mr-2" color="black" size="x-small"   @click="DeleteLineItem(product?.id)" >Delete</v-btn>
          </div>
        </v-list-item-subtitle>
  <v-divider />

</template>

<style scoped>

</style>
