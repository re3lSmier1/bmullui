<script setup>
function callOrderFilter(){
  alert("Call Order Filter")
}
</script>

<template>
  <div>
    <v-text-field
        label="Order Search"
        type="input" variant="solo" density="compact" @click="callOrderFilter()"
    ></v-text-field>
  </div>
</template>

<style scoped>

</style>
