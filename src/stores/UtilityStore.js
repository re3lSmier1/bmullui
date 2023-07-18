import { defineStore } from 'pinia';
import {ref} from "vue";
import {useGenericStore} from "./GenericStore";

export const useUtilityStore = defineStore('utility', {
  state: () => ({
    generic: useGenericStore(),
    url: ref(import.meta.env.VITE_APP_URL),
    makes: ref([]),
    categories: ref([]),
    models: ref([]),
    messageNotifierStatus: ref(false),
    notifierMessage: ref(null)
  }),
  getters: {
    getUrl: (state) => {
      console.log(state)
      return state.url
    },
  },
  actions: {
    GetMakes(){
       this.generic.SendGetRequest("Home/Products").then(response =>{
         this.makes = response?.data?.makes
         this.categories = response?.data?.vehicleCategories
       })
    },
    GetModels(data){
       this.generic.SendGetRequest(`List/ModelsByMake?id=${data}`).then(response =>{
         this.models = response?.data

       })
    },
    CallNotifier(message){
      this.messageNotifierStatus = true;
      this.notifierMessage = message
    }

  }
})
