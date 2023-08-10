<template>
  <BackAppBar />
  <div class="pa-5">
    <h2>Manage User</h2>
    <br>
    <v-row style="margin-bottom: -30px">
      <v-col cols="12" md="6">
        <FormText   label="First Name" name="FirstName"/>
      </v-col>
      <v-col cols="12" md="6">
        <FormText   label="Last Name" name="LastName"/>
      </v-col>
    </v-row>

    <v-row style="margin-bottom: -30px">
      <v-col cols="12" md="6">
        <FormText   label="Address Line One" name="AddressLineOne"/>
      </v-col>
      <v-col cols="12" md="6">
        <FormText   label="Address Line Two" name="AddressLineTwo"/>
      </v-col>
    </v-row>

    <v-row style="margin-bottom: -20px">
      <v-col cols="12" md="6">
        <FormText   label="Email Address" name="EmailAddressOne"/>
      </v-col>
      <v-col cols="12" md="6">
        <FormText   label="Phone Number" name="PhoneNumberOne"/>
      </v-col>
    </v-row>
    <div class="pa-5">
      <RolesPicker />
    </div>

<!--    <v-row class="pa-5 bg-grey-lighten-3" >
      <v-col cols="12" md="3" lg="2" v-for="item in currentUser?.roles" >

        <FormSwitch :label="item?.name" :name="item?.name" :is-true="item?.hasRole"/>
      </v-col>
    </v-row>-->
<!--    <br>
    <FormText   label="Tax Registration Number" name="TaxRegistrationNumber"/>-->
    <div class="pb-5">
      <v-btn  theme="blue" variant="elevated" color="blue" @click="submit"
             :loading="loading" :disabled="loading" class="mr-5"
      >
        <v-icon v-if="loading" icon="fa:fas fa-circle-notch fa-spin"></v-icon>
        Update User</v-btn>
      <v-btn  theme="danger" variant="outlined" color="red" @click="DeleteUser(currentId)">Delete User</v-btn>

    </div>
    <div class="pb-5">
     </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
 import {useForm} from "vee-validate";
import {failValidation, successValidation} from "@/services/ValidationService";
import FormText from "@/components/form/FormText.vue";
import FormSwitch from "@/components/form/FormSwitch.vue";
import {useUserStore} from "@/stores/UserStore";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router/dist/vue-router";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const currentId = route.query.id
const { currentUser } = storeToRefs(userStore)
import { schema } from "@/schemas/ManageUserSchema"
import BackAppBar from "@/components/BackAppBar.vue";
import RolesPicker from "@/components/StaffUsers/RolesPicker.vue";

 let loading = ref(false)

 const { setFieldValue, handleSubmit } = useForm({
   validationSchema: schema,
   initialValues: {
     Location: "Round the back",

   }
 });

 async function DeleteUser(id) {
   await userStore.Delete(id).then(response => {

     loading = false
     router.push("/staff-users")

   }).catch(error => {
     loading = false

   })

 }

watch(currentUser, async (newQuestion, oldQuestion) => {
  console.log(newQuestion)
  console.log(oldQuestion)
  setFieldValue('FirstName', newQuestion?.firstName);
  setFieldValue('LastName', newQuestion?.lastName);
  setFieldValue('AddressLineOne', newQuestion?.addressLineOne);
  setFieldValue('AddressLineTwo', newQuestion?.addressLineTwo);
  setFieldValue('EmailAddressOne', newQuestion?.emailAddressOne);
  setFieldValue('PhoneNumberOne', newQuestion?.phoneNumberOne);
  setFieldValue('TaxRegistrationNumber', newQuestion?.taxRegistrationNumber);
  setFieldValue('Id', newQuestion?.id);
  /*setValues({
    addressLine1: newQuestion?.addressLine1,
  });*/
})

const submit = handleSubmit(async (values, { resetForm }) => {
  //if validates, this code will work; else executes failValidation
  //console.log(values)
  loading = true
  await userStore.Edit(values).then(response => {

    loading = false
    //resetForm()
    alert("User was successfully updated ");
    router.push("/staff-users")

  }).catch(error => {
    loading = false

  })


  successValidation(values);
}, failValidation);

onMounted(async () => {
  console.log(route.query.id)
  await userStore.GetUserById(route.query.id)

})
</script>

<style scoped>

</style>
