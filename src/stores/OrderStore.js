import { defineStore } from 'pinia';
import {ref} from "vue";
import {useGenericStore} from "./GenericStore";
import {useUtilityStore} from "@/stores/UtilityStore";

export const useOrderStore = defineStore('orders', {
  state: () => ({
    generic: useGenericStore(),
    utility: useUtilityStore(),
    orderStatus: ref(localStorage.getItem('OrderId') !== null && localStorage.getItem('OrderId') !== undefined),
    orderNumber: ref(localStorage.getItem('OrderId')),
    orders: ref([]),
    newOrder: ref([]),
    currentOrder: ref([]),
    statusList: ref([]),
    OrderIdForView: ref(null),
    statusForOrderDetailModal: ref(false),
    orderInfo: ref({}),
    refundStatus: ref(false),
    refundOrderId: ref(null),
    checkOutModalStatus: ref(false),
  }),
  getters: {
   // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    Get(){
      this.generic.SendGetRequest("list/orders")
        .then((response) => {
          this.orders = response.data
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    All(){
      this.generic.SendGetRequest("/List/Orders")
        .then(response => {
          this.orders = response.data
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    GetOrderStatus(){
      this.generic.SendGetRequest("Home/Orders").then(response =>{
         this.statusList = response.data?.statuses
      }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    FilterByStatus(data){
      //console.log(data)
      return this.generic.SendGetRequest(`Filter/OrdersByStatus?Status=${data.Status}`).then(response=>{
        this.orders = response.data
      }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    FilterOrders(data){
      console.log(data)
      return this.generic.SendGetRequest(`Filter/Orders?Name=${data.Name}&OrderNumber=${data.OrderNumber}`).then(response=>{
        this.orders = response.data
      }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },

    AddLineItem(data) {
      data["OrderId"] = this.orderNumber
      return this.generic.SendPostRequest("Order/AddLineItem", data)
        .then(response => {
          this.OrderDetails()
        }).catch(err =>{
          this.utility.CallNotifier(err)
        })
      //this.counter++;
    },
    AssignToAgent() {
      //this.counter++;
    },
    Checkout() {
      //this.counter++;
    },
    Confirm() {
      //this.counter++;
    },
    ConfirmItem() {
      //this.counter++;
    },
    Create() {
      return this.generic.SendPostRequest("Order/Create", {"InHouse": true})
        .then(response => {
          console.log(response.data)
          this.orderStatus = false
          let self = this;
          localStorage.setItem("OrderId", response.data?.id)
          this.orderNumber = response.data?.id
          setTimeout(function () {
            self.orderStatus = true
          }, 500)
        }).catch(err =>{
          this.utility.CallNotifier(err)
        })
    },
    CreateItem(item) {
      //this.counter++;
      console.log(item)
      /*if(localStorage.getItem("OrderId") === null){

      }*/
      item["OrderId"] = localStorage.getItem("OrderId")
      item["ProductId"] = item.id
      item["IsProduct"] = true
      item["InHouse"] = true

      return this.generic.SendPostRequest("Order/CreateItem", {
        OrderId: localStorage.getItem("OrderId"),
        IsProduct: true,
        InHouse: true,
        ProductId: item.id
      }).catch(err =>{
        this.utility.CallNotifier(err)
      })

    },
    DeleteOrderItem(id){
      this.generic.SendPostRequest("Order/DeleteItem", {"OrderItemId": id, "OrderItem": id,  })
        .then(response =>{
          this.OrderDetails()
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    SaveOrder(values){
      return this.generic.SendPostRequest("Order/Save", values)
        .then(response => {

          this.Create()
        }).catch(err =>{
          this.utility.CallNotifier(err)
        })
    },
    ClearOrder(){
       this.generic.SendPostRequest("Order/Clear", {OrderId: this.orderNumber}).then(response =>{
         this.OrderDetails()
       }).catch(err =>{
         this.utility.CallNotifier(err)
       })

    },
    AddDiscount(values){
      return this.generic.SendPostRequest("Order/AddDiscount", values).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    RemoveDiscount(id){
      this.generic.SendPostRequest("Order/RemoveDiscount", { OrderItemId: id }).then(response => {
        this.OrderDetails()
      }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    DeleteOrder() {
       this.generic.SendPostRequest("Order/Delete", { OrderId: this.orderNumber })
         .then(response => {
           this.orderStatus = false
           this.Get()
         }).catch(err =>{
         this.utility.CallNotifier(err)
       })
    },
    DeleteLineItem(id) {
      return this.generic.SendPostRequest("Order/DeleteLineItem", {Id: id})
        .then(response => {
          this.OrderDetails()
          this.utility.CallNotifier("Line Item successfully deleted")
        }).catch(err =>{
          this.utility.CallNotifier(err)
        })
      //this.counter++;
    },
    ManageComment() {
      //this.counter++;
    },
    Pay() {
      //this.counter++;
    },
    PushToCashier(){
      this.generic.SendPostRequest("Order/Checkout", { OrderId: this.orderNumber})
        .then(r =>{
          this.orderStatus = false
          this.orderNumber = null
          localStorage.removeItem("OrderId")
          this.All()
          this.Create()
          this.checkOutModalStatus = true
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    OrderDetails(){
      this.generic.SendGetRequest(`Detail/Order?Id=${localStorage.getItem("OrderId")}`)
        .then(response => {
          this.newOrder = response.data
        }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    OrderDetailsById(OrderId){
      return this.generic.SendGetRequest(`Detail/Order?Id=${OrderId}`).then(res => {
        console.log(res.data)
        this.orderInfo = res.data
      }).catch(err =>{
        this.utility.CallNotifier(err)
      });

    },
    SetOrderToView(id){
      this.OrderIdForView = id;
      //this.OrderToViewStatus = false
    },
    CompleteOrder(id){
      return this.generic.SendPostRequest("Order/Complete", { OrderId: id }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    CancelOrder(id){
      return this.generic.SendPostRequest("Order/Cancel", { OrderId: id }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    },
    RefundOrder(data){
      console.log(data)
      return this.generic.SendPostRequest("Order/Refund", { OrderId: this.refundOrderId, Note: data.note }).catch(err =>{
        this.utility.CallNotifier(err)
      })
    }

  },
});
