<script setup>

import ProductTagsTable from "@/components/ProductTags/ProductTagsTable.vue";
import BackAppBar from "@/components/BackAppBar.vue";
</script>

<template>
  <BackAppBar />
  <div class="pa-5">
    <div class="d-flex justify-space-between mt-2">
      <div>
        <h2>Product Tags</h2>
      </div>
      <div>
        <v-btn color="primary" variant="elevated">New Tag</v-btn>
      </div>
    </div>
    <br>
    <ProductTagsTable />
  </div>
</template>

<style scoped>

</style>
