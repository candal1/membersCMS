import Vue from 'vue'
import Vuex from 'vuex'

import { account } from './acount_module';
import { users } from './users_module'
import { alert } from './alert_module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    account,
    users,
    alert
  }
})
