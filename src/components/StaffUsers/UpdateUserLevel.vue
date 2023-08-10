<script setup>

import FormSelect from "@/components/form/FormSelect.vue";
import {useUserStore} from "@/stores/UserStore";
const userStore = useUserStore()
</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <FormSelect :items="userStore.roles" name="Level" label="Level" />
    </v-col>
    <v-col cols="12" sm="4">
      <v-btn color="primary">Update</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>