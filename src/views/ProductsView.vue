<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiArrowLeft, mdiChevronRight} from '@mdi/js'
import BackAppBar from "@/components/BackAppBar.vue";
import ProductsFilter from "@/components/Products/ProductsFilter.vue";
import ProductCard from "@/components/Products/ProductCard.vue";
import {useProductStore} from "@/stores/ProductStore";
import {onMounted} from "vue";
import AddProduct from "@/components/Products/AddProduct.vue";
const productStore = useProductStore();

onMounted(async () => {
  await productStore.Get()
})
</script>

<template>
  <div class="pa-5 " >
    <BackAppBar />
    <div class="d-flex justify-space-between mt-2 mb-4">
      <div>
        <h2>Products </h2>
      </div>
      <div>
        <AddProduct />
      </div>
    </div>
    <div>
      <ProductsFilter />
      <div v-for="item in productStore?.products" :key="item.name">
        <ProductCard :product="item" style="margin-top: 7px"/>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
