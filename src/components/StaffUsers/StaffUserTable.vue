<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import {ref} from "vue";
import {useUserStore} from "@/stores/UserStore";
import {onMounted} from "vue";
const userStore = useUserStore()

onMounted(() => {
  userStore.Get();
})


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
const desserts = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0',
  },
])
</script>

<template>
  <div>
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="userStore.users"
        item-value="name"
        class="elevation-1 pa-5"
    >
      <template v-slot:item.option="{ item }">
        <v-btn size="small" color="primary">View</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>

</style>
