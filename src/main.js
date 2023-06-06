import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
import VueNumber from 'vue-number-animation'
import {currency} from "@/currency";
import axios from "axios";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueRouter from "vue-router";
import VueSkeletonLoader from 'skeleton-loader-vue'

/* Vue uses */
Vue.use(VueNumber)
Vue.use(Toaster, {timeout: 5000})
Vue.use(VueSweetalert2);
Vue.use(VueRouter)
Vue.use(axios)
Vue.use(require('vue-resource'));
Vue.component('vue-skeleton-loader', VueSkeletonLoader);

/* Requires*/
require('@/store/subscriber')

/* Vue configs */
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://api.arminmalek.ir/'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.config.productionTip = false
Vue.filter('currency', currency)

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

})