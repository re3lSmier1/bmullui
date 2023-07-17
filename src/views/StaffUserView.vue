<script setup>

import BackAppBar from "@/components/BackAppBar.vue";
import StaffUserTable from "@/components/StaffUsers/StaffUserTable.vue";
</script>

<template>
  <BackAppBar />
  <div class="pa-5">
    <div class="d-flex justify-space-between mt-2">
      <div>
        <h2>Staff User</h2>
      </div>
      <div>
        <v-btn color="primary" variant="elevated">New User</v-btn>
      </div>
    </div>
    <br>
    <StaffUserTable />
  </div>
</template>

<style scoped>

</style>
