<!--    
    TODO css styling
    TODO form validation
 -->
<template>
    <div class="mt-20 mb-10 flex justify-center content-center"> 
    <form class="bg-white shadow-md border rounded-lg px-20 pt-16 pb-16 mb-4" @submit.prevent="handleSubmit">
        <div class="mb-4">
            <label for="email">Email</label> <br>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="text" v-model="email" name="email" placeholder="Enter email...">
        </div>
        <div class="mb-4">
            <label for="password">Password</label> <br>
            <passwordShow @pass-update="mapPassword"></passwordShow>
        </div>
        <div class="flex items-center justify-between">
            <button class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="status.loggingIn">Login</button>
            <router-link class="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800" to="/register">Registration</router-link>
        </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import passwordShow from '@/components/passwordShow.vue'
 
export default {
    name: "Login",
    components: {
        passwordShow
    },
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
        },
        // Map password field form passwordShow component to this.password
        mapPassword (e) {
            this.password = e
        }
    }
}
</script>

