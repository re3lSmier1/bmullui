<script setup>

import BackAppBar from "@/components/BackAppBar.vue";

import FormText from "@/components/form/FormText.vue";
import FormTextArea from "@/components/form/FormTextArea.vue";
import FormSwitch from "@/components/form/FormSwitch.vue";
import {onMounted, ref, watch} from "vue";
import {useForm} from "vee-validate";
import {failValidation, successValidation} from "@/services/ValidationService";
import {useProductStore} from "@/stores/ProductStore";
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router/dist/vue-router";
import ImgCard from "@/components/ImgCard.vue";
import ManageProductTags from "@/components/ManageProductTags.vue";
import ManageProductImage from "@/components/ManageProductImage.vue";
const productStore = useProductStore()
const { currentProduct } = storeToRefs(productStore)
const route = useRoute()
const router = useRouter()
const file = ref(null)
const tab = ref(null)
let loading = ref(false)
const currentId = route.query.id

const { setFieldValue, handleSubmit } = useForm({
  //validationSchema: schema
  initialValues: {
    Location: "Round the back",
    ProductId: currentId

  }
});

async function DeleteProduct(id) {
  await productStore.Delete(id).then(response => {

    loading = false
    router.push("/products")

  }).catch(error => {
    loading = false

  })

}

const uploadFile = (event) => {
  console.log(event.target.files)
  file.value = event.target.files;
};

watch(currentProduct, async (newQuestion, oldQuestion) => {
  console.log(newQuestion)
  console.log(oldQuestion)
  setFieldValue('Name', newQuestion?.name);
  setFieldValue('Description', newQuestion?.description);
  setFieldValue('Sku', newQuestion?.sku);
  setFieldValue('Quantity', newQuestion?.quantity);
  setFieldValue('Price', newQuestion?.price);
  setFieldValue('isNew', newQuestion?.isNew);
  setFieldValue('Negotiable', newQuestion?.negotiable);
  /*setValues({
    addressLine1: newQuestion?.addressLine1,
  });*/
})

const submit = handleSubmit(async (values, { resetForm }) => {
  //if validates, this code will work; else executes failValidation
  //console.log(values)
  loading = true
  await productStore.Update(values).then(response => {

    loading = false
    //resetForm()

  }).catch(error => {
    loading = false

  })


  successValidation(values);
}, failValidation);

onMounted(async () => {
  console.log(route.query.id)
  await productStore.GetProductById(route.query.id)


})
</script>

<template>
  <div class="px-5">
    <BackAppBar />
    <div class="d-flex justify-space-between mt-2 ">
      <div>
        <h2> {{ currentProduct.name }} </h2>
      </div>
<!--      <div>
        <v-btn color="primary" variant="elevated">New User</v-btn>
      </div>-->
    </div>

    <v-tabs
        v-model="tab" color="primary"
    >
      <v-tab value="one">Details</v-tab>
      <v-tab value="two">Photos</v-tab>

    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="one">
        <div class="pa-3"><FormText  label="Name" name="Name" type="text" density="compact" /></div>
        <div class="px-3 "><FormTextArea  label="Description" name="Description" type="text" density="compact" /></div>
        <div class="pa-3"><FormText  label="Sku" name="Sku" type="text" density="compact" /></div>
        <!--          <div class="pa-3"><FormText  label="Quantity" name="Quantity" type="number" density="compact" /></div>-->
        <div class="pa-3"><FormText  label="Price" name="Price" type="number" density="compact" /></div>
        <div class="d-flex flex-row ml-5">
          <div class="mr-5">
            <FormSwitch  label="Is New" name="isNew"/>
          </div>
          <div>
            <FormSwitch  label="Negotiable" name="Negotiable"/>
          </div>

        </div>

        <div class="d-flex flex-row">
          <div class=" pb-5">
            <v-btn  theme="blue" variant="elevated" color="blue" @click="submit"
                    :loading="loading"  style="margin-bottom: -15px"
                    :disabled="loading"

            >
              <v-icon v-if="loading" icon="fa:fas fa-circle-notch fa-spin"></v-icon>
              Update Product Details</v-btn>
          </div>
          <div class="pb-5 px-4" >
            <v-btn  theme="red" variant="outlined" color="red" @click="DeleteProduct(currentId)">Delete Product </v-btn>
          </div>
        </div>
      </v-window-item>
      <v-window-item value="two">
        <v-row>
          <v-col cols="12">
            <ManageProductImage :current-id="currentProduct.id"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" md="4" lg="3"  v-for="pic in currentProduct.productPhotos">
            <ImgCard :source="pic" />
          </v-col>
        </v-row>
      </v-window-item>

    </v-window>


  </div>
</template>

<style scoped>

</style>
