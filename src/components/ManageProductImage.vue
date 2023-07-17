<template>
  <div class="pa-5" style="background-color: #F5F5F5">
    <div>
      <v-file-input
        chips
        multiple
        label="Upload Photo(s)"
        @change="uploadFile" ref="file"
      ></v-file-input>
    </div>
    <div class="pb-5" style="margin-bottom: -15px">
      <v-btn  theme="blue" variant="elevated" color="blue" @click="submit"
             :loading="loading"
             :disabled="loading"

      >
        <v-icon v-if="loading" icon="fa:fas fa-circle-notch fa-spin"></v-icon>
        Update Product Photo(s)</v-btn>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useProductStore} from "@/stores/ProductStore";
import {useForm} from "vee-validate";
const store = useProductStore()
const file = ref(null)
const loading = ref(false)

const props = defineProps({
  currentId: {
    required: true
  }
})
const { setFieldValue, handleSubmit } = useForm({

})

const uploadFile = (event) => {
  console.log(event.target.files)
  file.value = event.target.files;
};

const submit = handleSubmit(async (values, { resetForm }) => {

  if (file.value.length !== 0) {
    const formData = new FormData();
    //formData.append('Files', file.value);
    for (let i = 0; i < file.value.length; i++) {
      let files = file.value[i];

      formData.append('Files', file.value[i]);
    }
    formData.append('Id', props.currentId);
    store.UploadPhotos(formData)
  }
})
</script>

<style scoped>

</style>
