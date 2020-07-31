<!--    
    TODO form validation
    TODO forgot password
 -->
<template>
   <div class="flex justify-center items-center mt-10">
      <form class="my-20 py-10 px-12 rounded bg-white shadow-md text-gray-600" @submit.prevent="handleSubmit">
         <h2 class="header-style">Sign In</h2>
         <div class="mb-4">
            <label for="email">Email</label> <br />
            <input class="input-base" required type="text" v-model="email" name="email" placeholder="Enter email..." />
         </div>
         <div class="mb-4">
            <label for="password">Password</label> <br />
            <passwordShow @password-update="mapPassword" placeholder="Enter password..." />
         </div>
         <div class="flex items-center justify-between">
            <button class="btn-teal" :disabled="status.loggingIn">Login</button>
            <router-link class="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800" to="/register">Sign Up</router-link>
            <span v-show="status.loggingIn" class="loader" />
         </div>
      </form>
   </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PasswordShow from "@/components/PasswordShow.vue";

export default {
   name: "Login",
   components: {
      PasswordShow,
   },
   data() {
      return {
         email: "",
         password: "",
      };
   },
   computed: {
      ...mapState("account", ["status"]),
   },
   created() {
      this.logout();
   },
   methods: {
      ...mapActions("account", ["login", "logout"]),
      handleSubmit() {
         const { email, password } = this;
         if (email && password) {
            this.login({ email, password });
         }
      },

      // Map password field form passwordShow component to this.password
      mapPassword(e) {
         this.password = e;
      },
   },
};
</script>
