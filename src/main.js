// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/vant.js'
import ajax from './api/ajax'

Vue.config.productionTip = false

Vue.prototype.$ajax = ajax
import clipboard from "@/directive/clipboard/clipboard";
Vue.directive("clipboard", clipboard);


import './setFontUnit'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
