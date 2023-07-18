<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiChevronRight} from "@mdi/js";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
    <router-link :to="`/manage-products?id=${product.id}`" style="text-decoration: none">
      <v-card density="compact">
        <v-card-text style="padding: 7px">
          <div class="d-flex justify-space-between mt-2">
            <div>
<!--              {{ product }}-->
              <div>{{ product.name }} - {{  product.sku }}</div>
              <!--                <div>&#45;&#45; Product Description &#45;&#45;</div>-->
            </div>
            <div style="padding: 5px">
              <svg-icon type="mdi" :path="mdiChevronRight"></svg-icon>
            </div>
          </div>


        </v-card-text>
      </v-card>
    </router-link>

  </div>

</template>

<style scoped>

</style>
