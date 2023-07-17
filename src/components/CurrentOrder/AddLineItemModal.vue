<script setup>
import {onMounted, ref} from "vue";
import FormText from "@/components/form/FormText.vue";
import {useForm} from "vee-validate";

import {useOrderStore} from "@/stores/OrderStore";
import {useUtilityStore} from "@/stores/UtilityStore";
const loading = ref(false)
const  dialog = ref(false)
const orderStore = useOrderStore()
const utilityStore = useUtilityStore()

const props = defineProps({
  /*OrderItemId: {
    type: Number,
    required: true
  },
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
  //values["OrderItemId"] = props.OrderItemId
  await orderStore.AddLineItem(values)
      .then(response => {
        //console.log(response.data)
        orderStore.OrderDetails()
        dialog.value = false
        utilityStore.CallNotifier("Line Item successfully added")
        //orderStore.Create()
        //localStorage.setItem("OrderId", response.data?.id)
      })
});

onMounted(() => {
  //dialog.value = props.status
})
</script>

<template>
  <div>
    <v-dialog
        v-model="dialog"
        scrollable
        max-width="450px"
    >
      <template v-slot:activator="{ props }">
        <!--        <v-btn size="small" color="purple" variant="tonal" style="margin-right: 5px"
                  >Add Line Item</v-btn>-->
        <v-btn class="mr-3 mb-2" color="primary" v-bind="props">Add Line Item</v-btn>
<!--        <v-btn  class="text-none mr-1"
                color="brown-darken-3" size="large" variant="tonal">
          Add Line Item
        </v-btn>-->
      </template>
      <v-card>
        <v-card-title>New Line Item</v-card-title>
        <v-divider></v-divider>
        <v-card-text >
          <FormText   label="Line Item Name" name="ItemName" type="text" />
          <FormText   label="Price" name="Cost" type="number" />
          <FormText   label="Quantity" name="Quantity" type="number" />
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
  </div>
</template>

<style scoped>

</style>
