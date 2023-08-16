<script setup>

import {mdiPlus} from "@mdi/js";
import {onMounted, ref} from "vue";
const loading = ref(false)
const  dialog = ref(false)
import FormText from "@/components/form/FormText.vue";
import {useForm} from "vee-validate";
import {useOrderStore} from "@/stores/OrderStore";
import {useUtilityStore} from "@/stores/UtilityStore";
const orderStore = useOrderStore()
const utilityStore = useUtilityStore()

const props = defineProps({
  OrderItemId: {
    type: Number,
    required: true
  }/*,
  status: {
    type: Boolean,
    default: false
  }*/
})

const { setFieldValue, handleSubmit } = useForm({
  //validationSchema: schema,
  initialValues: {
    //InHouse: true
  }
});
const submit = handleSubmit(async (values) => {

  values["OrderItemId"] = props.OrderItemId
  console.log(values)
  await orderStore.SetItemPrice(values)
      .then(response => {
        //console.log(response.data)
        utilityStore.CallNotifier("Price was successfully updated")
        orderStore.OrderDetails()
        dialog.value = false
      })
      .catch(err => {
        utilityStore.CallNotifier(err.message)
      })
});

onMounted(() => {
  dialog.value = props.status
})
</script>

<template>
  <v-dialog
      v-model="dialog"
      scrollable
      max-width="450px"
  >
    <template v-slot:activator="{ props }">
      <v-btn class="mr-2" color="green" size="x-small"  v-bind="props">Set Price</v-btn>

    </template>
    <v-card>
      <v-card-title>Set Item Price</v-card-title>
      <v-divider></v-divider>
      <v-card-text >
        <FormText   label="Price" name="Price" type="number" />


        <div class="pb-5">
          <v-btn block theme="blue" variant="elevated" color="blue" @click="submit"
                 :loading="loading"
                 :disabled="loading"

          >
            <v-icon v-if="loading" icon="fa:fas fa-circle-notch fa-spin"></v-icon>
            Confirm</v-btn>
        </div>
      </v-card-text>
      <v-divider></v-divider>

    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>