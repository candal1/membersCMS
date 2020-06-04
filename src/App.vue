<template>
  <div id="app">
    <div id="nav" v-show="loggedIn">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/about">About</router-link>
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

<style>
#alert {
  font-size: 12px;
  width: 15em;
  margin: auto;
  padding: 1em;
  border: 2px solid rgba(255, 60, 0, 0.877);
  border-radius: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
