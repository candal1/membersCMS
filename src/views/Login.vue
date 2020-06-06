<!--    
    TODO css styling
    TODO form validation
 -->
<template>
    <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
           <div class="form-group">
            <label for="email">Email</label> <br>
            <input required type="text" v-model="email" name="email" placeholder="Enter email...">
        </div>
        <div class="form-group">
            <label for="password">Password</label> <br>
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
import { mapState, mapActions } from 'vuex'
 
export default {
    name: "Login",
    data () {
        return {
            email: '',
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
        handleSubmit () {
            const { email, password } = this;
            if(email && password) {
                this.login({email, password})
            }
        }
    }
}
</script>

<style>
.form-group {
    padding: .25em; 
}
</style>