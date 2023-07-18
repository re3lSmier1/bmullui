<template>
  <div class="text-center">
<!--    <v-btn
      color="primary"
      size="small" variant="tonal"
      @click="dialog = true"
    >
      Filter Orders
    </v-btn>-->
    <v-text-field
        label="Order Search"
        type="input" variant="solo" density="compact" @click="dialog = true"
    ></v-text-field>
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <div class="my-2 pa-3 bg-grey bg-grey-lighten-4">
          <v-row>
            <v-col cols="12" md="6">
              <FormText  label="Order Name" name="Name"/>
            </v-col>
            <v-col cols="12" md="6">
              <FormText  label="Order Number" name="OrderNumber"/>
            </v-col>
<!--            <v-col cols="12" md="12" style="margin-top: -30px">
              <FormSelect label="Filter by Status" name="Status"  :items="orderStore?.statusList"/>
            </v-col>-->

          </v-row>
          <div class="pb-5">
            <v-btn block theme="blue" variant="elevated" color="blue" @click="submit"
                   :loading="loading"
                   :disabled="loading"

            >
              <v-icon v-if="loading" icon="fa:fas fa-circle-notch fa-spin"></v-icon>
              Filter Orders</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>

</template>

<script setup>
import FormText from "@/components/form/FormText.vue";
import {ref} from "vue";
import {failValidation, successValidation} from "@/services/ValidationService";
import {useForm} from "vee-validate";
import {useOrderStore} from "@/stores/OrderStore";
const loading = ref(false)
const orderStore = useOrderStore()
const dialog = ref(false)


const { setFieldValue, handleSubmit } = useForm({
  /*validationSchema: schema,*/
  initialValues: {
    Name: "",
    Sku: ""
  }
});

const submit = handleSubmit(async (values) => {
  //if validates, this code will work; else executes failValidation
  console.log(values)
  orderStore.FilterOrders(values)

  successValidation(values);
}, failValidation);
</script>

<style scoped>

</style>
