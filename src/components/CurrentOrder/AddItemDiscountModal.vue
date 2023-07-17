<script setup>
import {onMounted, ref} from "vue";
import FormText from "@/components/form/FormText.vue";
import {useForm} from "vee-validate";

import {useOrderStore} from "@/stores/OrderStore";
import {mdiPlus} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
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
    InHouse: true
  }
});
const submit = handleSubmit(async (values) => {
  values["OrderItemId"] = props.OrderItemId
  await orderStore.AddDiscount(values)
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
      <!--        <v-btn icon size="small" density="comfortable" flat class="mr-1" variant="tonal" v-bind="props">
                <v-icon icon="mdi-sale" color="black"></v-icon>
              </v-btn>-->
      <v-btn class="mr-2" color="amber" size="x-small"  v-bind="props"><svg-icon type="mdi" size="15" :path="mdiPlus"></svg-icon>Discount</v-btn>
<!--      <v-btn icon size="small" density="comfortable" flat class="mr-1" variant="tonal" >
        <v-icon icon="mdi-sale" color="black"></v-icon>
      </v-btn>-->
      <!--        <v-tooltip text="Discount Item" location="top">
                <template v-slot:activator="{ props }">
                </template>
              </v-tooltip>-->
    </template>
    <v-card>
      <v-card-title>Add Discount Amount</v-card-title>
      <v-divider></v-divider>
      <v-card-text >
        <FormText   label="Discount Amount" name="Discount" type="number" />
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
