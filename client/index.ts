import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './main.vue'

Vue.use(VueRouter)
Vue.mixin({
  methods: {} // add global functions
})

new Vue({
  el: '#mount',
  render: r => r(Main),
  // router: new VueRouter(router)
})