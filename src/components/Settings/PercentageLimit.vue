<script setup>

import FormText from "@/components/form/FormText.vue";
import {ref} from "vue";

const disabled = ref(true)
</script>

<template>
  <div class="pa-5" style="background-color: white">
    <h4>Percentage Limit</h4>
    <FormText label="Percentage Limit" name="PercentageLimit" :disabled="disabled" />

    <v-row>
      <v-col cols="12" md="6">
        <v-btn color="primary mr-2" @click="disabled = !disabled">Edit</v-btn>
        <v-btn color="success" v-if="!disabled">Update</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

</style>