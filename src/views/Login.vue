<!--    
    TODO css styling
    TODO form validation
 -->
<template>
    <div class="mt-20 mb-10 flex justify-center content-center">
    <form class="bg-white shadow-md border rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
        <div class="mb-4">
            <label for="email">Email</label> <br>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="text" v-model="email" name="email" placeholder="Enter email...">
        </div>
        <div class="mb-4">
            <label for="password">Password</label> <br>
            <input class="shadow appearance-none border border-red-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required type="password" v-model="password" name="password" placeholder="Password">
        </div>
        <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="status.loggingIn">Login</button>
            <router-link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/register">Registration</router-link>
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

