import Vue from 'vue'
import App from './App.vue'
import { router } from './router/router'
import { store } from './store'


// import DirectusSDK from "@directus/sdk-js"

// const client = new DirectusSDK({
//   url: "https://localhost:8082"
// })

// Object.defineProperties( Vue.prototype, {
//   $client: { value: client }
// });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
