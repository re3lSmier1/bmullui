<script setup>

import {useForm} from "vee-validate";
import {ref} from "vue";
import BackAppBar from "@/components/BackAppBar.vue";
import BulkUploadProductPhoto from "@/components/Settings/BulkUploadProductPhoto.vue";
import {useProductStore} from "@/stores/ProductStore";
const loading = ref(false)
const productStore = useProductStore()

const { setFieldValue, handleSubmit } = useForm({
  //validationSchema: schema
  initialValues: {
    Location: "Round the back",

  }
});

function UploadBulk(){
  loading.value = true;
  productStore.BulkUploadProducts().then(response => {
    loading.value = false;
    alert("Bulk upload was triggered successfully")
  }).catch(err =>{
    console.log(err.response.data.message)
    loading.value = false;
    alert(err.response.data.message)
  })
}
</script>

<template>


    <br>
    <h5>Bulk Upload Sync</h5>
    <br>
    <p>Click here to trigger bulk upload of products</p><br>
    <v-btn variant="elevated" :loading="loading" color="primary" @click="UploadBulk">Sync Bulk Upload</v-btn>
    <br><br>
    <v-divider />
    <BulkUploadProductPhoto />

</template>

<style scoped>

</style>