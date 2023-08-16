<script setup>

import FormSelect from "@/components/form/FormSelect.vue";

import {useUserStore} from "@/stores/UserStore";
import {Field, useField} from "vee-validate";
import {toRef} from "vue";
const userStore = useUserStore()

const { value, handleBlur, errors, handleChange } = useField(toRef( 'name'));

</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <Field name="Level" v-slot="{ field, errors }" >
        <v-select  v-bind="field"
                   :items="userStore.currentUser?.roles"
                   :label="'Level'"
                   variant="solo"
                   return-object
                   item-title="name"
                   item-value="value"
                   @input="handleChange"
                   @blur="handleBlur"
                   v-model="value"
                   :density="'compact'"
                   :error-messages="errors"
        >
          <template v-slot:selection="{ item, index }">

            <v-chip v-if="item.value.hasRole === true">
              <span>{{ item.title }}</span>
            </v-chip>
          </template>
        </v-select>

      </Field>
    </v-col>
    <v-col cols="12" sm="4">
      <v-btn color="primary">Update</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>