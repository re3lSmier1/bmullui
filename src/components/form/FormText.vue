<template>
    <v-text-field v-model="value"
                  variant="solo"
                  @blur="handleBlur"
                  :label="label"
                  :error-messages="errors"
                  :density="density" style="min-width: 100%"
                  :type="type" />

</template>

<script setup>
    import { defineProps, toRef } from 'vue';
    import { useField } from 'vee-validate';
    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "text",
        },
        label: {
            type: String,
            required: true,
        },
        density: {
          type: String,
          default: "compact",

        }

    });
    const { value, handleBlur, errors } = useField(toRef(props, 'name'), undefined);
</script>

<style scoped>
</style>
