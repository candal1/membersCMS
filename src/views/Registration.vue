<!--
    TODO Form validation, error message display
    TODO CSS styling, layout
    TODO (CSS) no confirm password field 
            -> add form unmasking to password field 
-->
<template>
    <div class="mt-20 mb-10 flex justify-center content-center"> 
        <form class="bg-white shadow-md border rounded-lg px-20 pt-10 pb-12 mb-4" @submit.prevent="handleSubmit">
            <h2 class="mb-10 text-3xl">Register</h2>
            <div class="mb-4">
                <label for="firstName">First Name</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="text" v-model="user.firstName" name="firstName" >
            </div>
            <div class="mb-4">
                <label for="lastName">Last Name</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="text" v-model="user.lastName" name="lastName" >
            </div>
            <div class="mb-4">
                <label for="email">Email</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="text" v-model="user.email" name="email">
            </div>
            <div class="mb-4">
                <label for="password">Password</label>
                <passwordShow @password-update="mapPassword"></passwordShow>
            </div>
            <div class="mb-4">
                <button class="bg-teal-600 opacity-75 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="status.registering">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import passwordShow from '@/components/passwordShow.vue'

export default {
    name: "Registration",
    components: {
        passwordShow
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
