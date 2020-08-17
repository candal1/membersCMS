<!--
    TODO Form validation, error message display
    TODO CSS styling, layout
    TODO (CSS) no confirm password field 
            -> add form unmasking to password field 
-->
<template>
    <div class="flex items-center justify-center"> 
        <form class="px-12 py-10 mx-4 my-12 text-gray-600 bg-white rounded shadow-md md:my-32 " @submit.prevent="handleSubmit">
            <h2 class="header-style">Register</h2>
            <div class="mb-4">
                <label for="firstName">First Name</label>
                <input class="input-base" required type="text" v-model="user.firstName" name="firstName">
            </div>
            <div class="mb-4">
                <label for="lastName">Last Name</label>
                <input class="input-base" required type="text" v-model="user.lastName" name="lastName" >
            </div>
            <div class="mb-4">
                <label for="email">Email</label>
                <input class="input-base" required type="text" v-model="user.email" name="email">
            </div>
            <div class="mb-4">
                <label for="password">Password</label>
                <password-show @password-update="mapPassword"/>
            </div>
            <div class="flex items-center justify-between">
                <button class="btn-teal" >Register</button>
                <router-link class="inline-block nav-link" to="/login">Back</router-link>
                <span v-show="status.registering" class="loader"/>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PasswordShow from '@/components/PasswordShow.vue'

export default {
    name: "Registration",
    components: {
        'password-show': PasswordShow
    },
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['register']),
        handleSubmit () {
            this.register(this.user);
        },
        mapPassword (e) {
            this.user.password = e;
        }
    },
}
</script>
