import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductList from '../views/ProductList.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/product_list',
    name: 'product_list',
    component: ProductList
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
