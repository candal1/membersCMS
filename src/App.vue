<template>
  <div id="app">
    <div class="flex justify-start border-b">
      <router-link class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" to="/">Home</router-link> 
      <router-link class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" to="/login">Login</router-link> 
      <router-link class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" to="/about">About</router-link>
    </div>
    <div id="alert" v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
    <router-view></router-view>
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

