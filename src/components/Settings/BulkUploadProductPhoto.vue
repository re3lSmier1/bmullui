<template>
  <div>
    <br>
    Please upload a csv file here to do a bulk upload for photos <br><br>
    <v-file-input name="File"  color="primary" :loading="loading1" required :disabled="loading1"  ref="file"></v-file-input>
    <v-btn @click="PhotoSync()" color="primary">
      <v-icon>mdi-upload</v-icon>Upload Photos
    </v-btn>
  </div>
</template>

<script setup>
import {useProductStore} from "@/stores/ProductStore";
const productStore = useProductStore()
const loading = ref(false)
const loading1 = ref(false)
const file = ref(null)
import {ref} from "vue";
import {useForm} from "vee-validate";
import * as yup from 'yup';

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: yup.object({
    File: yup.mixed().required('File is required'),
  }),
  initialValues: {
    Location: "Round the back",

  }
});

function PhotoSync(){
  //console.log(file.value.files[0])
  let fd = new FormData()
  //fd.File = file.value.files[0]
  fd.append("File", file.value.files[0]);
  useProductStore().BulkUploadPhotos(fd).then(response => {
    loading1.value = false;
    alert("Bulk upload photo was triggered successfully")
  }).catch(err =>{
    loading1.value = false;
    alert(err.response.data.message)
  })
}
</script>

<style scoped>

</style>
