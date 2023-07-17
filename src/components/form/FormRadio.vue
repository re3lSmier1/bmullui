<template>
    <Field :name="name" v-slot="{ field, errors }">
        <v-radio-group inline
                @input="handleChange"
                @blur="handleBlur"
                :error-messages="errors" v-model="value">
            <v-radio v-for="item in labels" :label="item.text" :value="item.value"></v-radio>

        </v-radio-group>
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

        labels: {
            type: Array,
            required: true,
        },

    });
    const { value, handleBlur, errors, handleChange } = useField(toRef(props, 'name'), undefined);
</script>

<style scoped>
</style>
