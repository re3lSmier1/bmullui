<script setup>
import {ref, watch} from "vue";
import {useUtilityStore} from "@/stores/UtilityStore";
import {useForm} from "vee-validate";
import {failValidation, successValidation} from "@/services/ValidationService";
import {useProductTagStore} from "@/stores/ProductTagStore";
import {useProductStore} from "@/stores/ProductStore";
import FormText from "@/components/form/FormText.vue";
import FormTextArea from "@/components/form/FormTextArea.vue";
import FormSwitch from "@/components/form/FormSwitch.vue";
import FormSelect from "@/components/form/FormSelect.vue";

const dialog = ref(false)
const utilityStore = useUtilityStore()
const tagStore = useProductTagStore()
const loading = ref(false)
const productStore = useProductStore()

const file = ref(null)
const makeValue = ref(null)
const makeModels = ref(null)
const productCategories = ref(null)

const { setFieldValue, handleSubmit } = useForm({
  //validationSchema: schema
  initialValues: {
    Location: "Round the back",
    Make: makeValue.value,
    Model: makeModels.value,
    categories: productCategories.value
  }
});

function sendMake(event){
  console.log(event.target.value)
}

const uploadFile = (event) => {
  console.log(event.target.files)
  file.value = event.target.files;
};

watch(makeValue, (n, o)=>{
  utilityStore.GetModels(n)
})

const submit = handleSubmit(async (values, { resetForm }) => {
  //if validates, this code will work; else executes failValidation
  //console.log(values)
  values["Make"] = makeValue.value
  values["Model"] = makeModels.value
  values["Category"] = productCategories.value
  loading.value = true
  await productStore.Create(values).then(response => {
    if(tagStore.tagsById.length !== 0){
      tagStore.AddTagsById(response.data.id)
    }
    if (file.value.length !== 0){
      const formData = new FormData();
      //formData.append('Files', file.value);
      for( let i = 0; i < file.value.length; i++ ){
        let files = file.value[i];

        formData.append('Files', file.value[i]);
      }
      formData.append('Id', response.data.id);
      productStore.UploadPhotos(formData)
    }

    loading.value = false
    resetForm()
    utilityStore.CallNotifier("Product was successfully added ")
    window.location.reload()
  }).catch(error => {
    loading.value = false
    utilityStore.CallNotifier(error)

  })


  successValidation(values);
}, failValidation);
</script>

<template>
  <v-dialog
      v-model="dialog"
      persistent
      width="auto"
  >
    <template v-slot:activator="{ props }">
      <v-btn color="primary" variant="elevated" v-bind="props">New Product</v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        Add New Product
      </v-card-title>
      <v-card-text>
        <div class="pa-5">
          <v-row>
            <v-col cols="12" md="6">
              <div class="pa-3"><FormText  label="Name" name="Name" type="text" density="compact" /></div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="pa-3"><FormText  label="Sku" name="Sku" type="text" density="compact" /></div>
            </v-col>
          </v-row>
          <v-row style="margin-top: -45px">
            <v-col cols="12" md="6">
              <div class="pa-3"><FormText  label="Quantity" name="Quantity" type="number" density="compact" /></div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="pa-3"><FormText  label="Price" name="Price" type="number" density="compact" /></div>
            </v-col>
          </v-row>
          <v-row >
            <v-col cols="12" md="6" style="margin-top: -30px" class="px-5">
              <!--        <FormSelect  :items="utilityStore?.makes" label="Make" name="Make" density="compact" />-->
              <v-select name="Make"
                        :items="utilityStore?.makes"
                        label="Make"
                        variant="solo"
                        item-title="text"
                        item-value="value"
                        v-model="makeValue"
                        density="compact"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" style="margin-top: -30px"  class="px-5">
              <v-select name="Model"
                        :items="utilityStore?.models"
                        :disabled="utilityStore.models.length === 0"
                        label="Model"
                        variant="solo"
                        item-title="text"
                        item-value="value"
                        v-model="makeModels"
                        density="compact"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" style="margin-top: -30px"  class="px-5"><FormText  label="Year" name="Year" density="compact" type="number" /></v-col>
            <v-col cols="12" md="6" style="margin-top: -30px"  class="px-5">
              <v-select name="Category"
                        :items="utilityStore?.categories"
                        label="Category"
                        variant="solo"
                        item-title="text"
                        item-value="value"
                        v-model="productCategories"
                        density="compact"
              ></v-select>
            </v-col>
          </v-row>

          <div class="px-3 "><FormTextArea  label="Description" name="Description" type="text" density="compact" /></div>



          <div class="d-flex flex-row ml-5">
            <div class="mr-5">
              <FormSwitch  label="Is New" name="isNew"/>
            </div>
            <div class="mr-5">
              <FormSwitch  label="Negotiable" name="Negotiable"/>
            </div>

          </div>
          <v-col cols="12">
            <ProductTags />
            <div>
              <v-file-input
                  chips
                  multiple
                  label="Upload Photo(s)"
                  @change="uploadFile" ref="file"
              ></v-file-input>
            </div>
            <!--      <AddProductImage />-->
          </v-col>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="green-darken-1"
            variant="text"
            @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
            color="green-darken-1"
            variant="elevated"
            @click="dialog = false"
        >
          Add Product
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
