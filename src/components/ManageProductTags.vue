<template>
  <v-autocomplete
    v-model="currentTags"

    :items="info"
    chips
    closable-chips
    color="blue-grey-lighten-2"
    item-title="name"
    item-value="id" return-object
    label="Product Tags"
    multiple
  >
    <template v-slot:chip="{ props, item }">
      <v-chip
        v-bind="props"
        :prepend-avatar="item.raw.avatar"
        :text="item.raw.name"
      ></v-chip>
    </template>

    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        :prepend-avatar="item?.raw?.avatar"
        :title="item?.raw?.name"
        :subtitle="item?.raw?.group"
      ></v-list-item>
    </template>
  </v-autocomplete>
  <div class="pb-5 ">
    <v-btn  theme="blue" variant="elevated" color="blue" @click="submit"
           :loading="loading"
           :disabled="loading"
           style="margin-bottom: -15px"
    >
      <v-icon v-if="loading" icon="fa:fas fa-circle-notch fa-spin"></v-icon>
      Update Product Tags</v-btn>
  </div>
</template>

<script>
import {useProductTagStore} from "@/stores/ProductTagStore";

export default {
  name: "ManageProductTags",

  data () {
    return {
      autoUpdate: true,
      tags: [],
      isUpdating: false,
      name: 'Midnight Crew',
      title: 'The summer breeze',
      timeout: null,
    }
  },
  computed: {
    info: function (){
      return useProductTagStore().productTags
    }
  },

  mounted() {
    this.tags = this.tagList

  },
  methods: {
    UpdateProductTag(ProductId, Tags){

    },
  },
}
</script>
<script setup>
import {failValidation, successValidation} from "@/services/ValidationService";
import {onMounted, ref} from "vue";
import {useForm} from "vee-validate";
import {storeToRefs} from "pinia";
import {useProductTagStore} from "@/stores/ProductTagStore";
const { currentTags } = storeToRefs(useProductTagStore())
const tagStore = useProductTagStore()

const loading = ref(false)

const props = defineProps({
  tagList: {
    type: Array,
    required: true
  },
  currentId: {
    required: true
  }
})


const { setFieldValue, handleSubmit } = useForm({
  //validationSchema: schema
  initialValues: {
    Location: "Round the back",

  }
});

const submit = handleSubmit(async (values, { resetForm }) => {
  //if validates, this code will work; else executes failValidation
  //console.log(values)
  loading.value = true
  tagStore.AddTagsById(props.currentId).then(response => {

    loading.value = false
    //resetForm()

  }).catch(error => {
    loading.value = false

  })


  successValidation(values);
}, failValidation);

onMounted(async ()=> {
  currentTags.value = props.tagList
})
</script>

<style scoped>

</style>
