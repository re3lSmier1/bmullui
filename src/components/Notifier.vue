<template>
  <v-snackbar
    v-model="utilityStore.messageNotifierStatus"
    multi-line
  >
    {{ utilityStore.notifierMessage }}

    <template v-slot:actions>
      <v-btn
        color="red"
        variant="text"
        @click="utilityStore.messageNotifierStatus = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import {ref} from "vue";
import {useUtilityStore} from "@/store/UtilityStore";
const utilityStore = useUtilityStore()
const snackbar = ref(false)
const props = defineProps({
  /*status: {
    required: true,
    default: false
  },
  message: {
    required: true,
    type: String
  }*/
})

</script>

<style scoped>

</style>
