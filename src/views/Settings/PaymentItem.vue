<template>
  <form @submit.prevent="attemptPayment" class="w-full relative p-3 border-b rounded-lg shadow-outline"
        v-show="editing">
    <div class="pb-3">
      <h2 class="text-xs">You will be charged...</h2>
      <h2 class="text-xs font-bold text-xl text-red-500">$10.00</h2>
      <h2 class="text-xs">Per month <br/> Billed Monthly</h2>
    </div>
    <label class="block" for="name">Full Name</label>
    <input class="rounded-lg border bg-gray-100 mb-4 px-3 py-1 w-full focus:outline-none" id="name"
           placeholder="First and last name"
           type="text"/>
    <label class="block" for="card-element">Card</label>
    <div class="px-3 py-2 bg-gray-100 rounded-lg border" id="card-element"></div>
    <div class="text-red-500 pb-4" id="card-errors"></div>
    <button @click="cancel" class="font-semibold text-red-400 hover:text-red-600 focus:outline-none ml-1"
            type="button">
      Cancel
    </button>
    <button class="btn-base absolute right-0 mr-3" type="submit">Submit</button>
  </form>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "PaymentItem",
  props: {
    editing: Boolean
  },
  data () {
    return {
      stripe: undefined,
      elements: undefined,
      card: undefined
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // Initialize Stripe API objects on Mounted
    async init() {
      this.stripe = await loadStripe('pk_test_51HEQkFFATtdUWzuwUZPWzAwA3v1E8gMh6HqYJyEhAPLn8peahEySeNfKmmmn4r1VsnjRMRJIMzSk70ylIK7EwKvC00yTC9cNWA');
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount("#card-element");
    },
    // Tokenize card data and start api call
    attemptPayment() {
      this.stripe.createToken(this.card).then(function (result) {
        if (result.error) {
          // Inform the user if there was an error.
          let errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          this.tokenHandler(result.token);
        }
      });
    },
    // Post token to directus
    tokenHandler(token) {
      //make json object to send to directus endpoint
      this.$client.api.post("/custom/stripe/create-subscription", token)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
    },
    cancel () {
      this.$emit("cancel")
    }
  }
}
</script>

