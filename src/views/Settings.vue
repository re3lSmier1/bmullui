<script setup>
import {useProductStore} from "@/stores/ProductStore";

const productStore = useProductStore()
const loading = ref(false)
const loading1 = ref(false)
import {ref} from "vue";
import {useForm} from "vee-validate";
import BackAppBar from "@/components/BackAppBar.vue";
function PhotoSync(){
  console.log(file.value.files[0])
  let fd = new FormData()
  //fd.File = file.value.files[0]
  fd.append("File", file.value.files[0]);
  useProductStore().BulkUploadPhotos(fd).then(response => {
    loading.value = false;
    alert("Bulk upload photo was triggered successfully")
  }).catch(err =>{
    loading.value = false;
    alert(err.response.data.message)
  })
}

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
  <BackAppBar />
  <div class="pa-5">
    <div class="d-flex justify-space-between mt-2">
      <div>
        <h2>Settings</h2>
      </div>
      <div>
<!--        <v-btn color="primary" variant="elevated">New User</v-btn>-->
      </div>
    </div>
    <br>
    <v-divider />
    <div class="pa-5">
      <h2>Settings</h2>
      <br>
      <h5>Bulk Upload Sync</h5>
      <v-btn variant="elevated" :loading="loading" color="primary" @click="UploadBulk">Sync Bulk Upload</v-btn>
      <br><br>
      <v-divider />
      <br>
      Please upload a csv file here to do a bulk upload for photos <br><br>
      <v-file-input  color="primary" :loading="loading1" :disabled="loading1"  ref="file"></v-file-input>
      <v-btn @click="PhotoSync()" color="primary">
        <v-icon>mdi-upload</v-icon>Upload Photos
      </v-btn>
    </div>
    <v-divider />
    Percentage Limit
  </div>
</template>

<style scoped>

</style>
