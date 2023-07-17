<template>
    <Field :name="name" v-slot="{ field, errors }" >
        <v-select  v-bind="field"
                  :items="items"
                  :label="label"
                  variant="solo"
                   return-object
                  item-title="text"
                  item-value="id"
                  @input="handleChange"
                  @blur="handleBlur"
                  v-model="value"
                   :density="density"
                  :error-messages="errors"></v-select>

    </Field>

</template>

<script setup>
    import { defineProps, ref, watch, toRef } from "vue";
    import { Field, useField } from "vee-validate";
    import * as yup from "yup";
    const props = defineProps({
        label: { type: String, required: true },
        name: { type: String, required: true },
        items: { type: Array, required: true },
        density: { type: String, default: "compact" }
    });
    const select = ref("")

    const { value, handleBlur, errors, handleChange } = useField(toRef(props, 'name'));

    watch(() => props.name, (newValue) => {
        console.log(newValue)
    });
    /*const items = [{
        tag: 'option',
        value: 'tea',
        text: 'Tea',
    }];*/
</script>

<style scoped>
</style>
