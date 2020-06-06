<!--
    TODO Form validation, error message display
    TODO CSS styling, layout
    TODO (CSS) no confirm password field 
            -> add form unmasking to password field 
-->
<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="handleSubmit"> 
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input required type="text" v-model="user.firstName" name="firstName" >
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input required type="text" v-model="user.lastName" name="lastName" >
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input required type="text" v-model="user.email" name="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input required type="password" v-model="user.password" name="password">
            </div>
            <div class="form-group">
                <button :disabled="status.registering">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "Registration",
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
        }
    },
}
</script>
