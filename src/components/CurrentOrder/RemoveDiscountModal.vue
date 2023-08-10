<script setup>

import {mdiClose, mdiPlus} from "@mdi/js";
import {onMounted, ref} from "vue";
import FormText from "@/components/form/FormText.vue";
import {useForm} from "vee-validate";

import {useOrderStore} from "@/stores/OrderStore";
import SvgIcon from "@jamescoyle/vue-icon";
import FormSelect from "@/components/form/FormSelect.vue";
import FormCheckbox from "@/components/form/FormCheckbox.vue";
const loading = ref(false)
const  dialog = ref(false)
const orderStore = useOrderStore()

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
  await orderStore.RemoveDiscount(values)
      .then(response => {
        //console.log(response.data)
        orderStore.OrderDetails()
        dialog.value = false
        //orderStore.Create()
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
      <v-btn class="mr-2" color="red" size="x-small"   v-bind="props"><svg-icon size="15" type="mdi" :path="mdiClose"></svg-icon> Discount</v-btn>

    </template>
    <v-card>
      <v-card-title>Remove Discount </v-card-title>
      <v-divider></v-divider>
      <v-card-text >

        <FormText   label="Pin" name="Pin" type="password" />
        <div class="pb-5">
          <v-btn block theme="blue" variant="elevated" color="blue" @click="submit"
                 :loading="loading"
                 :disabled="loading"

          >
            <v-icon v-if="loading" icon="fa:fas fa-circle-notch fa-spin"></v-icon>
            Confirm</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>