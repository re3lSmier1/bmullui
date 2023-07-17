<script setup>

import {mdiChevronRight} from "@mdi/js";

const props = defineProps({
  tag: {
    required: true,
    type: Object
  }
})
</script>

<template>
  <v-card density="compact">
    <v-card-text style="padding: 10px">
      <div class="d-flex justify-space-between mt-2">
        <div>
          <div>{{ tag.name }}</div>
        </div>
        <div>
          <v-btn size="small" color="red">Delete</v-btn>
        </div>
      </div>


    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
