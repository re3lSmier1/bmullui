<script setup>

import FormText from "@/components/form/FormText.vue";
import {useProductStore} from "@/stores/ProductStore";
import {ref} from "vue";
const sku = ref(null)
const productStore = useProductStore()

async function GetBySku(sku){
  productStore.ProductsBySku(sku)
}
</script>

<template>
  <div>
    <FormText label="Find by Sku" name="sku" v-model="sku" @keyup="GetBySku(sku)"/>
  </div>
</template>

<style scoped>

</style>
