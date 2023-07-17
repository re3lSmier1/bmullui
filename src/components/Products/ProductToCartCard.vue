<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiCartPlus, mdiChevronRight} from "@mdi/js";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
    <v-card density="compact">
      <v-card-text style="padding: 7px">
        <div class="d-flex justify-space-between mt-2">
          <div>
            <!--              {{ product }}-->
            <div>{{ product.name }} - {{  product.sku }}</div>
            <!--                <div>&#45;&#45; Product Description &#45;&#45;</div>-->
          </div>
          <div>
            <v-btn icon color="success" size="small" >
              <div style="padding: 5px">
                <svg-icon size="20" type="mdi" :path="mdiCartPlus"></svg-icon>
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
