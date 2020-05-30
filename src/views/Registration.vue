<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="handleSubmit"> // TODO form validation
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input required type="text" v-model="firstName" name="firstName" >
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input required type="text" v-model="lastName" name="lastName" >
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input required type="text" v-model="username" name="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input required type="password" v-model="password" name="password">
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
                username: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['register']),
        handleSubmit (e) {
            // TODO: add form validation
            this.register(this.user);
        }
    },
}
</script>

<style scoped>
/* TODO styling */
</style>