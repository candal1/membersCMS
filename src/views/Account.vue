<template>
   <div class="flex flex-col justify-center items-center mt-20 mb-12">
      <h1 class="header-style text-5xl pb-0">Account Settings</h1>
      <h2 class="text-gray-600 pb-10">View and change account information, manage payment plans...</h2>
      <div class="flex items-center flex-col px-10 pb-10 rounded-lg shadow-lg text-gray-600 bg-white max-w-xl w-full mx-3">
         <h1 class="header-style text-center">Account Preferences</h1>
         <div class="border-b w-full mb-5">
            <p class="text-teal-600 font-semibold text-lg mr-5">Name:</p>
            <inputItem :text="fullName" type="name" :busy="busy" @status-change="busy = !busy" />
         </div>
         <div class="border-b w-full mb-5">
            <p class="text-teal-600 font-semibold text-lg mr-5">Email:</p>
            <inputItem :text="user['email']" type="email" :busy="busy" @status-change="busy = !busy" />
         </div>
         <div class="border-b w-full">
            <p class="inline text-teal-600 font-semibold text-lg mr-5">Password:</p>
            <passwordItem text="**********" :busy="busy" @status-change="busy = !busy" />
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import inputItem from "@/components/InputItem.vue";
import passwordItem from "@/components/PasswordItem.vue";

export default {
   name: "Account",
   components: { inputItem, passwordItem },
   data() {
      return {
         busy: false,
      };
   },
   computed: {
      ...mapState({
         user: (state) => state.account.user,
      }),
      fullName: function() {
         return this.user["first_name"] + " " + this.user["last_name"];
      },
   },
};
</script>
