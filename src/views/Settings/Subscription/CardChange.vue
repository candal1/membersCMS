<template>
  <div class="shadow-outline rounded-lg mt-2 absolute bg-white">
    <h2 class="font-semibold text-teal-600 mb-1">Enter Card Details</h2>
    <label class="hidden" for="name">Name</label>
    <input id="name"
           v-model="fullName"
           class="rounded-lg border bg-gray-100 mb-2 px-3 py-1 max-w-xxs w-full focus:shadow-outline focus:outline-none"
           placeholder="First and Last name"
           required
           type="text"/>
    <label class="hidden" for="name">Card</label>
    <div id="card"
         class="px-3 py-1.5 rounded-lg border bg-gray-100 text-gray-600 focus:outline-none max-w-xxs mb-8 sm:mb-0"></div>

    <div class=" absolute right-0 bottom-0 mb-2 mr-2">
      <button class="font-semibold text-red-400 hover:text-red-600 focus:outline-none mr-1" type="button"
              @click.prevent="clear">
        Cancel
      </button>
      <button class="btn-base" @click.prevent="">Confirm</button>
    </div>
  </div>
</template>

<script>
import {loadStripe} from "@stripe/stripe-js";

export default {
  name: "PaymentInline",
  data() {
    return {
      stripe: undefined,
      elements: undefined,
      card: undefined,
      fullName: ''
    }
  },
  mounted() {
    this.init();
  },
  computed: {},
  methods: {
    // Initialize Stripe API objects on Mounted hook
    async init() {
      // initialize some card coloring and sizing
      let style = {
        base: {
          color: '#718096',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          },
        }
      }
      // initialize stripe objects
      this.stripe = await loadStripe('pk_test_51HEQkFFATtdUWzuwUZPWzAwA3v1E8gMh6HqYJyEhAPLn8peahEySeNfKmmmn4r1VsnjRMRJIMzSk70ylIK7EwKvC00yTC9cNWA');
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card', {style: style});
      this.card.mount("#card");
    },

    clear() {
      this.$emit('clear');
    }
  }
}
</script>

<style scoped>

/* Styling for stripe element on :focus */
.StripeElement--focus {
  box-shadow: 0 0 0 4px rgba(255, 100, 100, 0.62);
}
</style>