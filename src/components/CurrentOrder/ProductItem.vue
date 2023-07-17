<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiArrowBottomLeft, mdiPlus, mdiClose, mdiArrowRight} from '@mdi/js'
</script>

<template>
  <v-list>
    <v-list-item>
      <v-list-item-title >
        <div class="d-flex justify-space-between">
          <div>Product Name - Sku</div>
          <div>Price</div>
        </div>
      </v-list-item-title>
      <v-list-item-subtitle>
        <div>
<!--          <v-chip class="mr-2" color="brown" label size="small">Add Discount</v-chip>
          <v-chip class="mr-2" color="red" label size="small">Remove Discount</v-chip>
          <v-chip class="mr-2" color="red" label size="small">Delete</v-chip>-->
          <v-btn class="mr-2" color="amber" size="x-small"><svg-icon type="mdi" size="15" :path="mdiPlus"></svg-icon>Discount</v-btn>
          <v-btn class="mr-2" color="red" size="x-small"><svg-icon size="15" type="mdi" :path="mdiClose"></svg-icon> Discount</v-btn>
          <v-btn class="mr-2" color="black" size="x-small">Delete</v-btn>
        </div>
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<style scoped>

</style>
