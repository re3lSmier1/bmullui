import { defineStore } from 'pinia';
import {ref} from "vue";
import {useGenericStore} from "./GenericStore";
import {useUtilityStore} from "./UtilityStore";

export const useUserStore = defineStore('users', {
  state: () => ({
    counter: 0,
    generic: useGenericStore(),
    utility: useUtilityStore(),
    updateRoleState: ref(false),
    updateRoleId: ref(null),
    user: ref(null),
    currentUser: ref(null),
    users: ref([]),
    roles: ref([]),
    currentUserRoles: ref([]),
    validate_url: ref(null),
    register_url: ref(null)
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    getUserById: (state) => {
      // @ts-ignore
      return state.users.filter((item) => item?.id === state.updateRoleId); //todos.value.filter((item) => item.type === activeFilter.value);
    }
  },
  actions: {
    Preload(){
      this.generic.SendGetRequest("?type=Admin")
        .then((response) => {
          console.log(response.body)
          this.users = response.data
        }).catch(err =>{
          this.utility.CallNotifier(err)
      })
    },
    async Add(values) {
      // @ts-ignore
      return this.generic.SendPostRequest("User/Add", values,  "application/x-www-form-urlencoded")
        .then((response) => {
          console.log(response)
        }).catch(err =>{
          this.utility.CallNotifier(err)
        })
    },
    async Get() {
      // @ts-ignore
      //await users.push(values)
      this.generic.SendGetRequest("list/adminusers")
        .then((response) => {
          console.log(response.body)
          this.users = response.data
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
      //console.log("blue")
      //return users.find(o => o.id === id);

    },
    async GetUserById(id) {
      // @ts-ignore
      this.generic.SendGetRequest(`Detail/UserProfile?id=${id}`)
        .then((response) => {
          this.currentUser = response.data
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },

    Edit(values) {
      return this.generic.SendPostRequest("User/Edit", values,  "application/x-www-form-urlencoded")
        .then((response) => {
          console.log(response)
        }).catch(err =>{
          this.utility.CallNotifier(err)
        })
    },
    ReplaceRoles() {
      this.counter++;
    },
    async Delete(id) {
      console.log(id)
      //await users.splice(id, 1)
      // @ts-ignore
      this.generic.SendPostRequest("User/Delete", id)
        .then((response) => {
          console.log("Deleted the user")
          this.Get()
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })

      // @ts-ignore

    },
    async GetUserRoles() {
      // @ts-ignore
      //await users.push(values)
      this.generic.SendGetRequest("home/users")
        .then((response) => {
          console.log(response.body)
          this.roles = response.data.roles
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
     // console.log("blue")


    },
    async GetUserRolesById(id) {
      // @ts-ignore
      //await users.push(values)
      this.generic.SendGetRequest(`/list/userRoles?userId=${parseInt(this.updateRoleId)}`)
        .then((response) => {
          console.log(response.body)
          this.currentUserRoles = response.data
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
     // console.log("blue")


    },
    async Logout() {
      // @ts-ignore
      //await users.push(values)
      this.generic.SendGetRequest(`/Auth/LogOut`)
        .then((response) => {
          console.log(response.body)
          this.currentUserRoles = response.data
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })


    },
    GeneratePin(x){
      this.generic.SendPostRequest('User/GeneratePin', {UserId: x})
          .then(response => {
            this.utility.CallNotifier("New pin was generated");
          }).catch(err => {
            this.utility.CallNotifier(err)
      })
    },
    ResetPin(){
      this.generic.SendPostRequest("User/ResetPinlock", { UserId: this.user?.id})
      .then(response => {
        this.utility.CallNotifier("Pin reset was successful");
      })
      .catch(err => {
        this.utility.CallNotifier(err)
      })
    },
    RoleChecker(role){
      return this.roles.includes(role)
    },
    RoleReturner(id){
      //console.log(id)
      return this.roles.includes(id)
    }

  },
});
