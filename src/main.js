import Vue from 'vue'
import App from './App.vue'
import { router } from './router/router'
import { store } from './store'
import './assets/tailwind.css'
import DirectusSDK from '@directus/sdk-js'


const sdk = new DirectusSDK({
  url: "http://10.0.0.11:8082",
  project: "_"
})

Object.defineProperties( Vue.prototype, {
  $client: { value: sdk }
});

// // export so utils can get the client
// export const client = this.$client;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
