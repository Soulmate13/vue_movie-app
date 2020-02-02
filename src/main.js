import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Routes from "./routes";

Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

Vue.config.productionTip = false


new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
