<template>
    <Field :name="name" v-slot="{ field, errors }">
<!--        <v-checkbox v-model="value"
                    :label="label"
                    :error-messages="errors"
                    ></v-checkbox>-->
      <v-switch
        v-model="value"
        hide-details density="compact"
        :true-value="true"
        :false-value="false"
        :error-messages="errors"
        :label="label"
      ></v-switch>
<!--      <v-switch
        v-model="value"
        hide-details
        :true-value="true"
        :false-value="false"
        :label="label"
        :error-messages="errors"
      ></v-switch>-->
    </Field>
</template>

<script setup>
import {defineProps, ref, watch, toRef, onMounted} from "vue";
    import { Field, useField } from "vee-validate";

    const props = defineProps({
        name: {
            type: String,
            required: true,
        },

        label: {
            type: String,
            required: true,
        },
        isTrue: {
          type: Boolean,
          default: false
        }

    });
    const { value, handleBlur, errors, handleChange, setValue } = useField(toRef(props, 'name'), undefined);
    onMounted(() => {
      value.value = props.isTrue
    })
</script>

<style scoped>
</style>
