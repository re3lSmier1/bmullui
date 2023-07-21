import { defineStore } from 'pinia';
import {useGenericStore} from "./GenericStore";
import {ref} from "vue";
import {useUtilityStore} from "@/stores/UtilityStore";


export const useProductTagStore = defineStore('product-tag', {
  state: () => ({
    counter: 0,
    utility: useUtilityStore(),
    generic: useGenericStore(),
    productTags: ref([]),
    currentTags: ref([]),
    //currentTagsId: ref([]),
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    tagsById: (state) => {
      console.log(state.currentTags)
      return Array.from(state.currentTags , x => {
        console.log(x.id)
        return x.id
      })
    }
  },
  actions: {
    Get(){
      this.generic.SendGetRequest("list/ProductTags")
        .then((response) => {
          this.productTags = response.data
        })
    },
    Create(values) {
      return this.generic.SendPostRequest("ProductTag/Create", values)
        .then((response) => {
          this.Get()
          this.utility.CallNotifier("Product Tag successfully created")
        })
    },
    Delete(id) {
      return this.generic.SendPostRequest("ProductTag/Delete", { Id: id })
        .then((response) => {
          this.Get()
          this.utility.CallNotifier("Product Tag successfully deleted")
        }).catch(err =>{
          this.utility.CallNotifier(err)
          })
    },
    Update() {

    },
    AddTagsById(id){
      return this.generic.SendPostRequest("Product/ManageTags", {
        ProductId: id,
        Tags: this.tagsById
      })
        .then((response) => {
          this.Get()
        })
    }

  },
});
