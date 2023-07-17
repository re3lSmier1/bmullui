<template>
    <v-textarea v-model="value"
                  variant="solo"
                  @blur="handleBlur"
                  :label="label"
                  :error-messages="errors"
                rows="3"
                   />

</template>

<script setup>
    import { defineProps, toRef, onMounted } from 'vue';
    import { useField } from 'vee-validate';
    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        standard: {
            type: String,
            default: ""
        }
    });
    const { value, handleBlur, errors, setFieldValue } = useField(toRef(props, 'name'), undefined);
    onMounted(async () => {
        //console.log(props.standard)
        //setFieldValue(value, props.standard);


    })
</script>

<style scoped>
</style>
