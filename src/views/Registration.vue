<!--
    TODO Form validation, error message display
    TODO CSS styling, layout
    TODO (CSS) no confirm password field 
            -> add form unmasking to password field 
-->
<template>
    <div class="flex justify-center items-center mt-10"> 
        <form class="bg-white shadow-md rounded my-20 py-10 px-12 mx-4 text-gray-600" @submit.prevent="handleSubmit">
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
                <passwordShow @password-update="mapPassword"></passwordShow>
            </div>
            <div class="mb-4">
                <button class="btn-teal" >Register</button>
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
asd