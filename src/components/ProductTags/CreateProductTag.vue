<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="mt-3"
               color="primary"
               dark
               v-bind="props"
        >
          New Product Tag
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>New Product Tag</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!--            <v-btn
                          variant="text"
                          @click="dialog = false"
                        >
                          Save
                        </v-btn>-->
          </v-toolbar-items>
        </v-toolbar>

        <div class="pa-5">
          <v-row style="margin-bottom: -15px">
            <v-col cols="12" md="12">
              <FormText   label="Name" name="Name"/>
            </v-col>

          </v-row>

          <div class="pb-5">
            <v-btn block theme="blue" variant="elevated" color="blue" @click="AddProductTag"
                   :loading="loading"
                   :disabled="loading"

            >
              <v-icon v-if="loading" icon="fa:fas fa-circle-notch fa-spin"></v-icon>
              Add Product Tag</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import {useForm} from "vee-validate";
import {failValidation, successValidation} from "@/services/ValidationService";
import * as yup from "yup";
//import {useUserStore} from "../stores/UserStore";
import {useProductTagStore} from "@/stores/ProductTagStore";
import FormText from "@/components/form/FormText.vue";
const dialog = ref(false)
const maximizedToggle = ref(true)
const loading = ref(false)
const tagStore = useProductTagStore()

const { setFieldValue, handleSubmit } = useForm({
  //validationSchema: schema,
  initialValues: {
    //departmentId: pStore.departmentToPostFor
  }
});

/*const initialValues = {
  terms: false,
  subscribed: false,
};*/

const AddProductTag = handleSubmit(async ( values, {resetForm }) => {
  //if validates, this code will work; else executes failValidation
  console.log(values)
  loading.value = true
  await tagStore.Create(values)
    .then(response =>{
      loading.value = false
      dialog.value = false
      resetForm()
      console.log(response)
    })
    .catch(error => {
      console.log(error)
      loading.value = false
      alert("We Couldnt Create this Tag")
    })
  /*await store.Login(values).then(response => {
    // console.log(response.data)
    store.token = response.data
    //console.log(document.cookie)
    instance.defaults.headers.common["Authorization"] = `Bearer ${response.data}`
    //instance.request.headers.Authorization = `Bearer ${response.data}`
    loading.value = false
    router.push("/validate")
  }).catch(error => {

    console.log(error)
    alert("We Couldnt log you in")
  })*/
  successValidation(values);
}, failValidation);

</script>

<style scoped>

</style>
