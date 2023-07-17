<script setup>
import {onMounted, ref} from "vue";
import FormText from "@/components/form/FormText.vue";
import {useForm} from "vee-validate";

import {useOrderStore} from "@/stores/OrderStore";
const loading = ref(false)
const  dialog = ref(false)
const orderStore = useOrderStore()

const props = defineProps({
  OrderId: {
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
    InHouse: true
  }
});
const submit = handleSubmit(async (values) => {
  values["OrderId"] = props.OrderId
  await orderStore.SaveOrder(values)
      .then(response => {
        //console.log(response.data)
        //orderStore.OrderDetails()
        dialog.value = false
        orderStore.Create()
        //localStorage.setItem("OrderId", response.data?.id)
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
<!--      <v-btn class="text-none mr-1"
             color="indigo-darken-3" size="large" variant="tonal">
        Save
      </v-btn>-->
      <v-btn v-bind="props" class="mr-3 mb-2" color="success">Save</v-btn>
    </template>
    <v-card>
      <v-card-title>Add Order Name</v-card-title>
      <v-divider></v-divider>
      <v-card-text >
        <FormText   label="Order Name" name="Name" type="text" />
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
      <!--        <v-card-actions>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialog = false"
                >
                  Save
                </v-btn>
              </v-card-actions>-->
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
