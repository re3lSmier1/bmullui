<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="mt-3"
          color="primary"
          dark
          v-bind="props"
        >
          New User
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
          <v-toolbar-title>New User</v-toolbar-title>
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
         <v-row style="margin-bottom: -30px">
           <v-col cols="12" md="6">
             <FormText   label="FirstName" name="FirstName"/>
           </v-col>
           <v-col cols="12" md="6">
             <FormText   label="LastName" name="LastName"/>
           </v-col>
         </v-row>

         <v-row style="margin-bottom: -30px">
           <v-col cols="12" md="6">
             <FormText   label="AddressLineOne" name="AddressLineOne"/>
           </v-col>
           <v-col cols="12" md="6">
             <FormText   label="AddressLineTwo" name="AddressLineTwo"/>
           </v-col>
         </v-row>

         <v-row >
           <v-col cols="12" md="6">
             <FormText   label="EmailAddressOne" name="EmailAddressOne"/>
           </v-col>
           <v-col cols="12" md="6">
             <FormText   label="PhoneNumberOne" name="PhoneNumberOne"/>
           </v-col>
         </v-row>
         <v-row>
           <v-col cols="12" md="6">
             <FormText   label="TaxRegistrationNumber" name="TaxRegistrationNumber"/>
           </v-col>
           <v-col cols="12" md="6">
             <FormText   label="User Pin" name="Pin"/>
           </v-col>
         </v-row>


         <div class="pb-5">
           <v-btn block theme="blue" variant="elevated" color="blue" @click="submit"
                  :loading="loading"
                  :disabled="loading"

           >
             <v-icon v-if="loading" icon="fa:fas fa-circle-notch fa-spin"></v-icon>
             Add User</v-btn>
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
import { schema } from "@/schemas/CreateUserSchema"
import {useUserStore} from "@/stores/UserStore";
import FormText from "@/components/form/FormText.vue";
import router from "@/router";
const dialog = ref(false)
const maximizedToggle = ref(true)
const loading = ref(false)
const userStore = useUserStore()

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    Type: "Admin"
  }
});

const initialValues = {
  terms: false,
  subscribed: false,
};

const submit = handleSubmit(async (values) => {
  //if validates, this code will work; else executes failValidation
  console.log(values)
  loading.value = true
  await userStore.Add(values)
    .then(response =>{
      console.log(response)
      loading.value = false
      alert("User was successfully created")
      router.push("/staff-users")
    })
    .catch(error => {
      console.log(error)
      alert("We Couldnt Create this User")
    })

  successValidation(values);
}, failValidation);

</script>

<style scoped>

</style>
