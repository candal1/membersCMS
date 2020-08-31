<template>
   <div class="h-auto md:h-screen bg-orange-100 overflow-x-auto" id="app">
      <div class="w-full px-1 md:px-3 py-2 flex flex-wrap items-center shadow-md bg-orange-100 text-center md:fixed z-40">
         <img class="rounded-full w-10" alt="Dolphin H.H. emblem" src="./assets/dhh_tran.png" />
         <router-link class="nav-link" active-class="nav-active" to="/" exact>Home</router-link>
         <router-link class="nav-link" active-class="nav-active" to="/lessons">Lessons</router-link>
         <router-link class="nav-link" active-class="nav-active"  to="/about">About</router-link>
         <router-link v-if="!loggedIn" active-class="nav-active" class="nav-link ml-auto" to="/login">Login</router-link>
         <router-link v-if="!loggedIn" class="py-2 px-4 bg-orange-200 hover:bg-orange-300 text-teal-500 font-semibold rounded-lg focus:outline-none" to="/register">Sign Up</router-link>
         <router-link v-if="loggedIn" active-class="nav-active" class="nav-link ml-auto" :to="{ name: 'Settings', params: { id: id } }">Settings</router-link>
         <router-link v-if="loggedIn" class="py-2 px-4 bg-orange-200 hover:bg-orange-300 text-teal-500 font-semibold rounded-lg focus:outline-none" to="/login">Logout</router-link>
      </div>
      <alert-modal />
      <transition name="slide-fade" mode="out-in">
         <router-view :class="alert.message ? 'blurObject' : ''" />
      </transition>
      <footer-item :class="alert.message ? 'blurObject' : ''" />
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AlertModal from '@/components/AlertModal.vue';
import FooterItem from '@/components/FooterItem.vue';

export default {
   name: 'app',
   components: {
      'alert-modal': AlertModal,
      'footer-item': FooterItem,
   },
   computed: {
      ...mapState({
         user: (state) => state.account.user,
         alert: (state) => state.alert,
         loggedIn: (state) => state.account.status.loggedIn,
      }),
      id: function() {
         if (typeof this.user === 'undefined') {
            return -1;
         } else {
            return this.user['id'];
         }
      },
      pageName: function() {
         return this.$route.name;
      },
   },
   methods: {
      ...mapActions({
         clearAlert: 'alert/clear',
      }),
   },
   watch: {
      // clear alerts on page change
      // eslint-disable-next-line no-unused-vars
      $route(to, from) {
         this.clearAlert();
      },
   },
};
</script>

<style scoped>
.blurObject {
   opacity: 65%;
   filter: blur(0.1rem);
   -webkit-filter: blur(0.1rem);
   transition: 0.21s filter ease;
   -webkit-transition: 0.21s -webkit-filter ease;
}
.slide-fade-enter-active {
   transition: all 0.2s ease;
}
.slide-fade-leave-active {
   transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
   transform: translateX(0.8rem);
   opacity: 0;
}
</style>
