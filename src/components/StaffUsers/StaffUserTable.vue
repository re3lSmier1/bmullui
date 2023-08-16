<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import {ref} from "vue";
import {useUserStore} from "@/stores/UserStore";
import {onMounted} from "vue";
import router from "@/router";
import UpdateUserRole from "@/components/StaffUsers/UpdateUserLevel.vue";
import RolesPicker from "@/components/StaffUsers/RolesPicker.vue";
const userStore = useUserStore()

onMounted(() => {
  userStore.Get();
})

function GeneratePin(x) {
  userStore.GeneratePin(x)
}


const itemsPerPage = ref(25)
const headers = ref([
  {
    title: 'Name',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Email', align: 'end', key: 'emailAddress' },
  { title: 'TRN', align: 'end', key: 'trn' },
  { title: 'Options', align: 'end', key: 'option' },
  //{ title: 'Iron (%)', align: 'end', key: 'iron' },
])

function Manage(id){
  router.push({path: "/manage/staff-user", query: { id: id }})
}
</script>

<template>
  <div>
    <v-expansion-panels class="mb-3" v-for="item in userStore.users" :key="item">
      <v-expansion-panel
      >
        <v-expansion-panel-title expand-icon="mdi-menu-down">
          <b>{{ item.name }}</b> | {{ item.emailAddress }} | {{ item.phoneNumber }}
          <br>

        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="">
            <div>Address: {{ item.address }}</div>
            <div>TRN: {{ item.trn }}</div>
<!--            <div>TRN: {{ item.userType }}</div>--> <br>

              <UpdateUserRole />
<!--              <RolesPicker />-->
            <v-btn color="primary" class="mr-5" @click="GeneratePin(item.id)">Generate Pin</v-btn>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="userStore.users"
        item-value="name"
        class="elevation-1 pa-5"
    >
      <template v-slot:item.option="{ item }">
        <v-btn size="small" color="primary" @click="Manage(item.raw.id)">View</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>

</style>
