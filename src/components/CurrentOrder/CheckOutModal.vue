<script setup>
import {ref} from "vue";
import {useOrderStore} from "@/stores/OrderStore";
const orderStore = useOrderStore()
const dialog = ref(true)

function GenerateNewOrder(){
  orderStore.Create().then(response => {
    window.location.reload()
  })
}
</script>

<template>
  <v-dialog
      v-model="orderStore.checkOutModalStatus"
      persistent
      width="auto"
  >
    <template v-slot:activator="{ props }">

    </template>
    <v-card>
<!--      <v-card-title class="text-h5">
        Use Google's location service?
      </v-card-title>-->
      <v-card-text>
        <v-btn color="primary" class="mr-2"  @click="GenerateNewOrder">New Order</v-btn>
        <v-btn color="success" class="mr-2" to="/orders">Go to Order</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="green-darken-1"
            variant="text"
            @click="orderStore.checkOutModalStatus = false"
        >
          Disagree
        </v-btn>
        <v-btn
            color="green-darken-1"
            variant="text"
            @click="orderStore.checkOutModalStatus = false"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
