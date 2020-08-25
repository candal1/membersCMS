<template>
  <div class="flex flex-col items-center justify-center mx-1 mt-20 mb-12">
    <h1 class="pb-0 text-5xl header-style">Settings</h1>
    <h2 class="pb-10 text-gray-600">View and change account information, manage payment plans...</h2>
    <subscription-item/>
    <account-item/>
  </div>
</template>

<script>
import Preferences from "@/views/Settings/Preferences";
import Subscription from "@/views/Settings/Subscription";

export default {
  name: 'Settings',
  components: {'account-item': Preferences, 'subscription-item': Subscription},
};
</script>
