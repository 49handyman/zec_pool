import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home'
import Order from '@/views/order/Order'
import OrderDetails from '@/views/orderDetails'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/order/:buyId',
      name: 'Order',
      component: Order
    },
    {
      path: '/orderDetails',
      name: 'OrderDetails',
      component: OrderDetails
    }
  ],
  mode:'history'
})

router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})
export default router
