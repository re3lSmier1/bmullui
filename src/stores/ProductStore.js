import { defineStore } from 'pinia';
import {useGenericStore} from "./GenericStore";
import {ref} from "vue";
import {useUtilityStore} from "./UtilityStore";

export const useProductStore = defineStore('products', {
  state: () => ({
    generic: useGenericStore(),
    utility: useUtilityStore(),
    products: ref([]),
    product_group_list: ref([]),
    currentProduct: ref({}),
    currentPhotos: ref({}),
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    Get(){
      this.generic.SendGetRequest("List/Products")
        .then((response) => {
          this.products = response.data
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    GetProductById(id){
      this.generic.SendGetRequest(`Detail/Product?id=${id}`)
        .then((response) => {
          this.currentProduct = response.data
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    Create(values) {
      console.log(values)
      return this.generic.SendPostRequest("/Product/Create", values)
      //console.log(values)
    },
    async Filter(values){
      this.generic.SendGetRequest("Filter/Product", values)
        .then((response) => {
          this.products = response.data
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    CreateGroup(){
      return this.generic.SendPostRequest("Product/CreateGroup", this.product_group_list)
    },
    Delete(id){
      return this.generic.SendPostRequest("/Product/Delete", {Id: id})
    },
    BulkUpload(url, files){
      return this.generic.SendPostRequest(url, files)
    },
    DeletePhotos(id){
      ///Product/DeletePhotos
      return this.generic.SendPostRequest("/Product/DeletePhoto", {Id: id})
    },
    BulkUploadProducts(){
      ///Product/DeletePhotos
      return this.generic.SendPostRequest("/Product/BulkUploadProducts")
    },
      BulkUploadPhotos(fd){
      ///Product/DeletePhotos
      return this.generic.SendPostRequest("/Product/BulkUploadProductPhotos", fd)
    },

    GroupAddProduct(){},
    GroupDeleteProduct(){},
    ManageTags(){},
    MarkAvailable(id){
      this.generic.SendPostRequest("Product/MarkAvailable", {Id: id})
          .then(response =>{
            this.utility.CallNotifier("The product has been made available")
          })
          .catch(err => {
            this.utility.CallNotifier(err.message)
          })
    },
    MarkUnavailable(id){
      this.generic.SendPostRequest("Product/MarkUnavailable", {Id: id})
          .then(response =>{
            this.utility.CallNotifier("The product has been made unavailable")
          })
          .catch(err => {
            this.utility.CallNotifier(err.message)
          })
    },
    MarkGroupAvailable(){

    },
    MarkGroupUnavailable(){

    },
    SetAsMainPhoto(photoId, id){
      return this.generic.SendPostRequest("/Product/SetMainPhoto", { productid: id, PhotoId: photoId})
          .then(response => {
            this.utility.CallNotifier("Main photo was successfully updated")
          })
          .catch(err =>{
            this.utility.CallNotifier("Error updating main photo")
          })
    },
    Update(values){
      return this.generic.SendPostRequest("/Product/Update", values)
    },
    UploadPhotos(formData){
      return this.generic.SendPostRequest("/Product/UploadPhotos", formData,  "multipart/form-data")
    },
    pushToProductGroup(item){
      this.product_group_list.push(item)
    },
    ProductsBySku(sku){
      if (sku.length === 0){
        this.Get()
      }else{
        this.generic.SendGetRequest("/Filter/ProductsBySku", { Sku: sku.length === 0 ? "" : sku})
          .then(response => {
            console.log(response.data)
            this.products = response.data
          }).catch(err =>{
          this.utility.CallNotifier(err)
        })
      }
    }

  },
});
