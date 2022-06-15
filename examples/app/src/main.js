import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
