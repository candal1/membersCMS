<template>
  <div class="flex flex-col items-center w-full max-w-xl px-10 pb-10 mx-3 text-gray-600 bg-white rounded-lg shadow-lg">
    <h1 class="text-center header-style">Subscriptions</h1>
    <div>

    </div>
  </div>

</template>

<script>
import {loadStripe} from '@stripe/stripe-js';

export default {
  name: "Subscription",
  data () {
    return {
        stripe: null
    }
  },
  created() {
    this.stripe = loadStripe('pk_test_51HEQkFFATtdUWzuwUZPWzAwA3v1E8gMh6HqYJyEhAPLn8peahEySeNfKmmmn4r1VsnjRMRJIMzSk70ylIK7EwKvC00yTC9cNWA');
  }
}
</script>

<style scoped>

</style>