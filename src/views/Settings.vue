<script setup>
import {useProductStore} from "@/stores/ProductStore";

const productStore = useProductStore()

const loading1 = ref(false)
const file = ref(null)
import {ref} from "vue";
import {useForm} from "vee-validate";
import BackAppBar from "@/components/BackAppBar.vue";
import PercentageLimit from "@/components/Settings/PercentageLimit.vue";
import BulkUploadProductPhoto from "@/components/Settings/BulkUploadProductPhoto.vue";
import BridgeButton from "@/components/BridgeButton.vue";
import BulkUpload from "@/views/BulkUpload.vue";





</script>

<template>
  <BackAppBar />
  <div class="pa-5">
    <div class="d-flex justify-space-between mt-2">
      <div>
        <h1>Settings</h1>
      </div>
      <div>
<!--        <v-btn color="primary" variant="elevated">New User</v-btn>-->
      </div>
    </div>
    <br>
<!--    <v-row>
      <v-col cols="12" sm="4" ><BridgeButton url="/settings/bulk_upload" icon="mdi-cart" name="Bulk Upload" /></v-col>
      <v-col cols="12" sm="4" ><BridgeButton url="/PercentageLimit" icon="mdi-cart" name="Percentage Limit" /></v-col>
&lt;!&ndash;      <v-col cols="12" sm="4" ><BridgeButton url="/role_management" icon="mdi-cart" name="Role Management" /></v-col>
      &ndash;&gt;<v-col cols="12" sm="4" ><BridgeButton url="/product_tags" icon="mdi-cart" name="Product Tags" /></v-col>
      <v-col cols="12" sm="4" ><BridgeButton url="/staff-users" icon="mdi-cart" name="Staff Users" /></v-col>
&lt;!&ndash;      <v-col cols="12" sm="4" ><BridgeButton url="/client-users" icon="mdi-cart" name="Client Users" /></v-col>
    &ndash;&gt;</v-row>-->
      <v-divider />
      <BulkUpload />

    <v-divider />
    <div class="pa-5">
      <PercentageLimit />
    </div>
  </div>
</template>

<style scoped>

</style>
