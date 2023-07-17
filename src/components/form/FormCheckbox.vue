<template>
    <Field :name="name" v-slot="{ field, errors }">
        <v-checkbox v-model="value"
                    :label="label"
                    :error-messages="errors"
                    ></v-checkbox>
    </Field>
</template>

<script setup>
    import { defineProps, ref, watch, toRef } from "vue";
    import { Field, useField } from "vee-validate";

    const props = defineProps({
        name: {
            type: String,
            requird: true,
        },
        
        label: {
            type: String,
            required: true,
        }
        
    });
    const { value, handleBlur, errors, handleChange } = useField(toRef(props, 'name'), undefined);
</script>

<style scoped>
</style>