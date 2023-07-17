<template>
  <div>
    <h4>{{ props.label }}</h4>
  </div>
  <VueEditor :name="name" v-model="value"/>
</template>

<script setup>
import { VueEditor } from "vue3-editor";


import { defineProps, toRef } from 'vue';
import { useField } from 'vee-validate';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    required: true,
  }

});
const { value, handleBlur, errors } = useField(toRef(props, 'name'), undefined);
</script>

<style scoped>

</style>
