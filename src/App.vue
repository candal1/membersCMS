<template>
  <div class="h-screen bg-orange-100" id="app">
    <div class="flex justify-start border-b-4 bg-orange-200">
      <router-link class="inline-block py-2 px-4 text-teal-500 hover:text-teal-800 font-semibold" to="/">Home</router-link> 
      <router-link class="inline-block py-2 px-4 text-teal-500 hover:text-teal-800 font-semibold" to="/login">Login</router-link> 
      <router-link class="inline-block py-2 px-4 text-teal-500 hover:text-teal-800 font-semibold" to="/about">About</router-link>
    </div>
    <div id="alert" v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
    <router-view class=""></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
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
        $route (){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>

