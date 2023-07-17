<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiChevronRight} from "@mdi/js";
</script>

<template>
  <div>
    <v-card density="compact">
      <v-card-text style="padding: 7px">
        <div class="d-flex justify-space-between mt-2">
          <div>
            <div>-- Product Name & Sku --</div>
            <!--                <div>&#45;&#45; Product Description &#45;&#45;</div>-->
          </div>
          <div>
            <svg-icon type="mdi" :path="mdiChevronRight"></svg-icon>
          </div>
        </div>


      </v-card-text>
    </v-card>
  </div>

</template>

<style scoped>

</style>
