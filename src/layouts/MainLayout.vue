<script setup>
  import {onMounted} from "vue";
  import axios from "axios";
  import {useUserStore} from "@/stores/UserStore";
  import {useProductStore} from "@/stores/ProductStore";
  import {useOrderStore} from "@/stores/OrderStore";
  import {useUtilityStore} from "@/stores/UtilityStore";
  import {useProductTagStore} from "@/stores/ProductTagStore";
  import Notifier from "@/components/Notifier.vue";
  const userStore = useUserStore()
  const productStore = useProductStore()
  const orderStore = useOrderStore()
  const utilityStore = useUtilityStore()
  const productTagStore = useProductTagStore()
  import instance from "../services/AxiosService";

  onMounted(async () => {
    console.log(instance.defaults)
    instance.defaults.baseURL = import.meta.env.VITE_APP_URL
    //console.log(import.meta.env.VITE_APP_URL)
    axios.get(`${import.meta.env.VITE_APP_URL}?type=Admin`,{ withCredentials:true })
        .then(async response => {
          console.log(response.data)

          if (response.data.user?.id.length !== 0) {
            userStore.user = response.data.user
            userStore.validate_url = response.data.validate_url
            userStore.register_url = response.data.register_url

            await userStore.GetUserRoles()
            await productStore.Get()
            await orderStore.Get()
            await orderStore.GetOrderStatus()
            await utilityStore.GetMakes()

            setTimeout(function (){
              productTagStore.Get()
            }, 1000)

          } else {
            window.location.href = response.data.validate_url
          }

        })
  })
</script>

<template>
  <v-layout>
    <v-main style="background-color: #F5F5F5; min-height: 100vh">
      <RouterView />
      <Notifier />
    </v-main>
  </v-layout>

</template>

<style scoped>

</style>
