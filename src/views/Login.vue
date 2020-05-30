<template>
    <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit"> // TODO form validation
           <div class="form-group">
            <label for="username">Username</label>
            <input required type="text" v-model="username" name="username" placeholder="Enter Username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input required type="password" v-model="password" name="password" placeholder="Password">
        </div>
        <div class="form-group">
            <button :disabled="status.loggingIn">Login</button>
            <router-link to="/register">Registration</router-link>
        </div>
    </form>
  </div>
</template>

<script>
import {mapState, mapActions } from 'vuex'
 
export default {
    name: "Login",
    data () {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        this.logout();
    },
    methods: {
        ...mapActions('account',  ['login', 'logout']),
        handleSubmit (e) {
            const { username, password } = this;
            if(username && password) {
                this.login({username, password})
            }
        }
    }
}
</script>

<style>
    /* TODO styling */
</style>