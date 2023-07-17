<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiArrowLeft, mdiChevronRight} from '@mdi/js'
import BackAppBar from "@/components/BackAppBar.vue";
import ProductsFilter from "@/components/Products/ProductsFilter.vue";
import ProductCard from "@/components/Products/ProductCard.vue";
</script>

<template>
  <div>
    <BackAppBar />

    <div class="pa-5 " >
      <ProductsFilter />
      <ProductCard />
    </div>
  </div>
</template>

<style scoped>

</style>
