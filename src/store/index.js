import Vue from 'vue'
import Vuex from 'vuex'

import { account } from './modules/account_module';
import { alert } from './modules/alert_module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    account,
    alert
  }
})
