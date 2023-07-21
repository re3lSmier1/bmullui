<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiCartPlus, mdiChevronRight} from "@mdi/js";
import {useOrderStore} from "@/stores/OrderStore";
import {useUtilityStore} from "@/stores/UtilityStore";
const orderStore = useOrderStore()
const utilityStore = useUtilityStore()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

async function PushToOrder(item) {
  await orderStore.CreateItem(item)
      .then(response => {
        // console.log(response.data)
        orderStore.OrderDetails()
        utilityStore.CallNotifier("Item successfully added to current order")
        // dialog.value = false
        // localStorage.setItem("OrderId", response.data?.id)
      }).catch(err =>{
        utilityStore.CallNotifier(err)
      })
}
</script>

<template>
  <div>
    <v-card density="compact">
      <v-card-text style="padding: 7px 15px ">
        <div class="d-flex justify-space-between mt-2">
          <div>
            <!--              {{ product }}-->
            <div>{{ product.name }} - {{  product.sku }}</div>
<!--            <div>{{ product.priceDisplay }}</div>-->
          </div>
          <div>
            <v-btn icon color="success" size="x-small" @click="PushToOrder(product)"
                   v-if="orderStore.currentOrderStatus === 'Open' ">
              <div style="padding: 5px">
                <svg-icon size="15" type="mdi" :path="mdiCartPlus"></svg-icon>
              </div>
            </v-btn>

          </div>
        </div>


      </v-card-text>
    </v-card>
<!--    <router-link to="/" style="text-decoration: none">

    </router-link>-->

  </div>

</template>

<style scoped>

</style>
