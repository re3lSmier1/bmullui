<script setup>

import BridgeButton from "@/components/BridgeButton.vue";
</script>

<template>
  <v-app-bar :elevation="2" color="primary"  density="compact"></v-app-bar>
  <v-container style="margin-top: 10vh">
    <div class="text-center">
      <img src="../assets/bmull_logo_1.png" style="max-height: 270px; max-width: 270px; height: auto; width: auto" alt="">
    </div>

    <v-row>
      <v-col cols="12" sm="4" ><BridgeButton url="/current-order" icon="mdi-cart" name="Current Order" /></v-col>
      <v-col cols="12" sm="4" ><BridgeButton url="/products" icon="mdi-domain" name="Products" /></v-col>
      <v-col cols="12" sm="4" ><BridgeButton url="/orders" icon="mdi-table-border" name="Orders" /></v-col>
      <v-col cols="12" sm="4" ><BridgeButton url="/staff-user" icon="mdi-account" name="Staff Users" /></v-col>
      <v-col cols="12" sm="4" ><BridgeButton url="/settings" icon="mdi-cog" name="Setting" /></v-col>
      <v-col cols="12" sm="4" ><BridgeButton url="/product-tags" icon="mdi-tag" name="Product Tags" /></v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
