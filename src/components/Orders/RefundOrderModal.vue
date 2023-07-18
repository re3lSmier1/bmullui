<template>
  <div class="text-center">
    <v-dialog
      v-model="orderStore.refundStatus"
      width="600px"
    >

      <v-card>

          <v-container fluid>
            <h3>Refund</h3>
            <p>Write a reason/comment for refund</p>
            <FormTextArea rows="3" name="note" label="Note/Comment"></FormTextArea>
          </v-container>

        <v-card-actions>
          <v-btn color="primary" :loading="loading" variant="elevated" @click="submit">Refund</v-btn>
          <v-btn color="primary" @click="orderStore.refundStatus = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {useOrderStore} from "@/stores/OrderStore";
  import {useForm} from "vee-validate";
  import {failValidation, successValidation} from "@/services/ValidationService";
  import FormTextArea from "@/components/form/FormTextArea.vue";
  import {useUtilityStore} from "@/stores/UtilityStore";
  const dialog = ref(false)
  const orderStore = useOrderStore()
  const loading = ref(false)
  const utilityStore = useUtilityStore()

  const { setFieldValue, handleSubmit } = useForm({
    //validationSchema: schema
    initialValues: {

    }
  });

  const submit = handleSubmit(async (values, { resetForm }) => {
    //if validates, this code will work; else executes failValidation
    console.log(values)

    loading.value = true
    await orderStore.RefundOrder(values).then(response => {

      loading.value = false
      resetForm()
    }).catch(error => {
      console.log(error.response)
      loading.value = false
      utilityStore.CallNotifier(error.response.data.message)
    })
    successValidation(values);
  }, failValidation);

</script>

<style scoped>

</style>
