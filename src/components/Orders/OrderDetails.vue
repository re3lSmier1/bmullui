<template>
  <div class="text-center">



    <v-dialog
      v-model="orderStore.statusForOrderDetailModal"
      width="600px"
    >
      <v-card>
        <v-card-title>Order No: {{ orderInfo?.orderNumber }}</v-card-title>
        <v-card-text>
          <div>{{ orderInfo.orderName }}</div>
          <div>{{ orderInfo.createdDisplay }} <span v-if="orderInfo.updatedDisplay"> | {{ orderInfo.updatedDisplay }} </span></div>
<!--          {{ orderInfo }}-->
<!--          <div>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</div>-->
          <div>
            <v-table density="compact" style="font-size: small">
              <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Price
                </th>
                <th class="text-left">
                  SKU
                </th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="item in orderInfo.orderItems"
                :key="item.name"
              >
                <td>{{ item?.product?.name }}</td>
                <td>{{ item.priceDisplay }}</td>
                <td>{{ item?.product?.sku }}</td>
                <td>Inventory Item</td>
              </tr>
              <tr
                v-for="item in orderInfo.lineItems"
                :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.priceDisplay }}</td>
                <td></td>
                <td >Line Item</td>
              </tr>

              </tbody>
            </v-table>
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="px-5 ">

            <v-btn color="yellow" size="small" variant="elevated"  @click="MakeCurrentOrder(orderInfo.id)"
                   v-if="orderInfo?.statusDisplay === 'Pending'"
                   :disabled="orderInfo?.orderItems?.length === 0 && orderInfo?.lineItems?.length === 0">Edit</v-btn>

            <v-btn color="success" size="small" variant="elevated"  @click="CompleteOrder(orderInfo?.orderNumber)" v-if="orderInfo?.statusDisplay === 'Checked Out'"
                   :disabled="orderInfo?.orderItems?.length === 0 && orderInfo?.lineItems?.length === 0">Complete</v-btn>
            <v-btn color="black" size="small" variant="elevated"  @click="RefundOrder(orderInfo?.orderNumber, true)" v-if="orderInfo?.statusDisplay === 'Complete'"
                   >Refund</v-btn>

            <v-btn color="red" size="small" variant="elevated" @click="CancelOrder(orderInfo?.orderNumber)" v-if="orderInfo?.statusDisplay === 'Checked Out'"
                   :disabled="orderInfo?.orderItems?.length === 0 && orderInfo?.lineItems?.length === 0">Cancel</v-btn>
            <v-btn color="primary" size="small" variant="elevated"  @click="orderStore.statusForOrderDetailModal = false">Close</v-btn>

          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useOrderStore} from "@/stores/OrderStore";
import {storeToRefs} from "pinia";
import { useRouter } from "vue-router";
const orderStore = useOrderStore()
const router = useRouter()


  const dialog = ref(false)
const { OrderIdForView, statusForOrderDetailModal, orderInfo } = storeToRefs(orderStore)
  const props = defineProps({
    OrderId: {
      type: Number,
      required: true
    },
    status: {
      type: Boolean,
      required: true,
      default: false
    }
  })
function MakeCurrentOrder(id){
  localStorage.setItem("OrderId", id)
  this.orderNumber = id
  orderStore.OrderDetails()
  router.push("/csa/create-order")
}

function CompleteOrder(id){
  orderStore.CompleteOrder(id)
    .then(response => {
      window.location.reload()
    });
}
function RefundOrder(id, status){
  orderStore.refundStatus = status
  orderStore.refundOrderId = id
}


function CancelOrder(id){
  orderStore.CancelOrder(id)
    .then(response => {
      window.location.reload()
    });
}

watch(statusForOrderDetailModal, (n, o) =>{
  if(n){
    orderStore.OrderDetailsById(props.OrderId)

  }
})


  onMounted(async () =>{
    //this.dialog = status
    /*await orderStore.OrderDetailsById(props.OrderId)
      .then(res => {
        console.log(res.data)
        //this.orderInfo.value = res.data
      });*/
  })
</script>

<style scoped>

</style>
