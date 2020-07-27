<template>
   <div class="h-auto md:h-screen bg-orange-100 overflow-x-auto" id="app">
      <div class="w-full px-1 md:px-3 py-2 flex flex-wrap items-center shadow-md bg-orange-100 text-center md:fixed z-30">
         <img class="rounded-full w-10" alt="Dolphin H.H. emblem" src="./assets/dhh_tran.png" />
         <router-link class="nav-link" to="/">Home</router-link>
         <router-link class="nav-link" to="/lessons">Lessons</router-link>
         <router-link class="nav-link" to="/about">About</router-link>
         <router-link v-if="!loggedIn" class="nav-link ml-auto" to="/login">Login</router-link>
         <router-link v-if="!loggedIn" class="py-2 px-4 bg-orange-200 hover:bg-orange-300 text-teal-500 font-semibold rounded-lg focus:outline-none" to="/register">Sign Up</router-link>
         <router-link v-if="loggedIn" class="nav-link ml-auto" :to="{ name: 'Account', params: { id: id } }">Account</router-link>
         <router-link v-if="loggedIn" class="py-2 px-4 bg-orange-200 hover:bg-orange-300 text-teal-500 font-semibold rounded-lg focus:outline-none" to="/login">Logout</router-link>
      </div>
      <div v-if="alert.message" class="flex justify-center">
         <AlertItem :message="String(alert.message)" @clear="clearAlert" />
      </div>
      <transition name="slide-fade" mode="out-in">
         <router-view class="" />
      </transition>
      <FootItem />
   </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AlertItem from "@/components/AlertItem.vue";
import FootItem from "@/components/FootItem.vue";

export default {
   name: "app",
   components: {
      AlertItem,
      FootItem,
   },
   computed: {
      ...mapState({
         user: (state) => state.account.user,
         alert: (state) => state.alert,
         loggedIn: (state) => state.account.status.loggedIn,
      }),
      id: function() {
         if (typeof this.user === "undefined") {
            return -1;
         } else {
            return this.user["id"];
         }
      },
   },
   methods: {
      ...mapActions({
         clearAlert: "alert/clear",
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

<style>
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
