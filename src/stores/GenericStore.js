import {  ref } from "vue";
import {defineStore, storeToRefs} from 'pinia'
import instance from "../services/AxiosService";

export const useGenericStore = defineStore('generic', () => {
  //data
  //const count = ref(0)
  //const apiDevUrl = 'https://bmull.axium.io/';
  //const wordpress_api = 'https://bmull.axium.io';
  //const name = ref('Eduardo')

  //getters
  //const doubleCount = computed(() => count.value * 2)

  //actions
  function SendPostRequest( url, data = {}, contentType = "application/x-www-form-urlencoded", credentials = true , method = "POST" ) {

    return instance({
      method,
      url,
      data,
      headers: {
        'Content-Type': contentType, //x-www-form-urlencoded
        "withCredentials": credentials,
        "X-Requested-With": "XMLHttpRequest",
        //"Authorization": `Bearer ${bearer}`
      },
    });
  }
  function SendGetRequest( url, params, method = "GET", credentials = true ) {
    //console.log({aa:auth.token})
    return instance({
      method,
      url,
      params,
      headers: {
          //"Authorization": `Bearer ${bearer}`
        "withCredentials": credentials,
      },
    })
  }


  return {  SendGetRequest, SendPostRequest }
})
