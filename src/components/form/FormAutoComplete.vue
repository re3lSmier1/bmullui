<template>
    <Field :name="name" v-slot="{ field, errors }">
        <v-autocomplete
                :label="label"
                :items="items"
                v-model="value"
                variant="solo"
                item-title="name"
                item-value="id"
                @input="handleChange"
                @blur="handleBlur"
                :error-messages="errors"
                ></v-autocomplete>
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
        type: {
            type: String,
            requird: true,
        },
        label: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true
            }
    });
    const { value, handleBlur, errors, handleChange } = useField(toRef(props, 'name'), undefined);
</script>

<style scoped>
</style>
