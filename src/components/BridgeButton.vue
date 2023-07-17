<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})
</script>

<template>
  <router-link :to="props.url" class="text-decoration-none">
    <v-card
        color="#385F73"
        theme="dark"
        style="padding: 15px"
    >
      <v-card-subtitle>
        <div class="d-flex flex-column text-center">
          <div>
            <v-icon :icon="icon"></v-icon>
          </div>
          <div>
            {{ name }}
          </div>
        </div>
      </v-card-subtitle>


    </v-card>
  </router-link>
</template>

<style scoped>

</style>
