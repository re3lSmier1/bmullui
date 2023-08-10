import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from "@/views/ProductsView.vue";
import Bridge from "@/views/Bridge.vue";
import OrdersView from "@/views/OrdersView.vue";
import StaffUserView from "@/views/StaffUserView.vue";
import ProfileView from "@/views/ProfileView.vue";
import ProductTagsView from "@/views/ProductTagsView.vue";
import CurrentOrderView from "@/views/CurrentOrderView.vue";
import Settings from "@/views/Settings.vue";
import ManageProduct from "@/components/Products/ManageProduct.vue";
import ManageUser from "@/views/ManageUser.vue";
import BulkUpload from "@/views/BulkUpload.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Bridge', component: Bridge },
    { path: '/profile', name: 'Profile', component: ProfileView },
    { path: '/products', name: 'Products', component: ProductsView },
    { path: '/manage-products', name: 'Products - Manage', component: ManageProduct },
    { path: '/orders', name: 'Orders', component: OrdersView },
    { path: '/staff-users', name: 'Staff Users', component: StaffUserView },
    { path: '/manage/staff-user', name: 'Staff Users - Manage', component: ManageUser },
    { path: '/product-tags', name: 'Product Tags', component: ProductTagsView },
    { path: '/current-order', name: 'Current Order', component: CurrentOrderView },
    { path: '/settings', name: 'Settings', component: Settings },
    { path: '/settings/bulk_upload', name: 'Settings - Bulk Upload', component: BulkUpload },
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
