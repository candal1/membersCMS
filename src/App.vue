<template>
  <div class="h-auto md:h-screen bg-orange-100" id="app">
      <div class="md:fixed w-full px-1 md:px-3 py-2 flex justify-start items-center shadow-md bg-orange-100 text-center">
        <img class="rounded-full h-auto w-12 transition ease-in-out duration-300 transform hover:scale-110" alt="Dolphin H.H. emblem" src="./assets/dhh_tran.png">
        <router-link class="nav-link" to="/">Home</router-link> 
        <router-link class="nav-link" to="/about">About</router-link>
        <router-link class="nav-link ml-auto" to="/login">Login</router-link> 
        <router-link class="py-2 px-4 bg-orange-200 hover:bg-orange-300 text-teal-500 font-semibold rounded-lg" to="/register">Sign Up</router-link> 
      </div>
    <div class="flex justify-center">
      <alert class="" v-if="alert.message" :message="String(alert.message)" @clear="clearAlert" ></alert>
    </div>
    <router-view class=""></router-view>
    <foot></foot>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import alert from '@/components/alert.vue'
import foot from '@/components/foot.vue'

export default {
    name: 'app',
    components: {
      alert,
      foot 
    },
    computed: {
      ...mapState({ 
        alert: state => state.alert,
        loggedIn: state => state.account.status.loggedIn
      })
    },
    methods: {
      ...mapActions({
        clearAlert: 'alert/clear' 
      })
    },
    watch: {
        // clear alerts on page change
        // eslint-disable-next-line no-unused-vars
        $route (to, from){
            this.clearAlert();
        }
    } 
};
</script>

