<script setup>
  import {useUserStore} from "@/stores/UserStore";
  import {onMounted, watch} from "vue";
  import {storeToRefs} from "pinia";
  import {useUtilityStore} from "@/stores/UtilityStore";
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore)
  const utilityStore = useUtilityStore()

  const  chips = []

  /*function currentRoles(){
    for(let i = 0; user["roles"]?.length === 0; i++){
      alert("")
    }
  }*/
  watch(user, (n, o) => {
    for(let i = 0; i < n.roles.length ; i++){
      //alert(userStore.RoleReturner(n.roles[i]))
    }
  })

  function remove (item) {
    this.chips.splice(this.chips.indexOf(item), 1)
  }

  onMounted(() => {
    //currentRoles()
  })
</script>

<template>
  <v-row style="margin-top: -30px">
    <v-col cols="12" sm="8">
      <v-combobox
          v-model="chips"
          :items="utilityStore.accessLevels === null ? [] : utilityStore.accessLevels"
          item-title="text"
          item-value="id"
          chips
          label="Current User Roles"
          multiple
          return-object
          variant="solo" density="compact"
      >
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip
              v-bind="attrs"
              :model-value="selected"
              closable
              @click="select"
              @click:close="remove(item)"
          >
            <strong>{{ item }}</strong>&nbsp;
            <span>(interest)</span>
          </v-chip>
        </template>
      </v-combobox>
    </v-col>
    <v-col cols="12" sm="4">
      <v-btn color="primary">Update</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>