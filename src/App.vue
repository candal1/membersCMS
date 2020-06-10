<template>
  <div class="h-screen bg-orange-100" id="app">
      <div class="fixed w-full flex justify-start items-center border-b-2 bg-orange-200 ">
        <img class="rounded-full h-auto w-12 m-1" alt="Dolphin H.H. emblem" src="./assets/dhh_tran.png">
        <router-link class="inline-block py-2 px-4 text-teal-500 hover:text-teal-900 font-semibold transition ease-linear duration-1000" to="/">Home</router-link> 
        <router-link class="inline-block py-2 px-4 text-teal-500 hover:text-teal-900 font-semibold transition ease-linear duration-1000" to="/about">About</router-link>
        <router-link class="inline-block py-2 px-4 ml-auto text-teal-500 hover:text-teal-900 font-semibold transition ease-linear duration-1000" to="/login">Login</router-link> 
      </div>
    <div class="flex justify-center">
      <alert v-if="alert.message" :message="alert.message"></alert>
    </div>
    <router-view class="mt-10"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import alert from '@/components/alert.vue'

export default {
    name: 'app',
    components: {
      alert  
    },
    computed: {
        ...mapState({ 
            alert: state => state.alert,
            loggedIn: state => state.account.status.loggedIn
        })
    },
    watch: {
        $route (){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>

