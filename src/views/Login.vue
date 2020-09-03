<!--    
    TODO form validation
    TODO forgot password
 -->
<template>
  <div class="flex items-center justify-center">
    <form class="px-12 py-10 my-16 text-gray-600 bg-white rounded shadow-md md:my-32" @submit.prevent="handleSubmit">
      <h2 class="header-style">Sign In</h2>
      <div class="mb-4">
        <label for="email">Email</label> <br/>
        <input id="email" v-model="email" class="input-base" name="email" placeholder="Enter email..." required type="text"/>
      </div>
      <div class="mb-4">
        <label for="password">Password</label> <br/>
        <password-show id="password" placeholder="Enter password..." @password-update="mapPassword"/>
      </div>
      <div class="flex items-center justify-between">
        <button :disabled="status.loggingIn" class="btn-teal">Login</button>
        <router-link class="inline-block text-sm font-bold text-teal-500 align-baseline hover:text-teal-800"
                     to="/register">Sign Up
        </router-link>
        <span v-show="status.loggingIn" class="loader"/>
      </div>
    </form>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import PasswordShow from '@/components/PasswordShow.vue';

export default {
  name: 'Login',
  components: {
    'password-show': PasswordShow,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState('account', ['status']),
  },
  created() {
    this.logout();
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit() {
      const {email, password} = this;
      if (email && password) {
        this.login({email, password});
      }
    },

    // Map password field form passwordShow component to this.password
    mapPassword(e) {
      this.password = e;
    },
  },
};
</script>
