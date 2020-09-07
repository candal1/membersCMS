<template>
  <form :class="formStyle"
        @submit.prevent="attemptPayment">
    <div class="pb-3">
      <h2 class="text-xs">You will be charged...</h2>
      <h2 class="text-xs font-bold text-xl text-red-500">$5.00<span class="text-teal-500 font-semibold">/m</span></h2>
      <h2 class="text-xs">Per month<br/>Billed monthly</h2>
    </div>
    <label class="block text-teal-600 font-semibold mb-1" for="fullName">Name</label>
    <input id="fullName" v-model="fullName"
           class="rounded-lg border bg-gray-100 mb-4 px-3 py-1 w-full focus:shadow-outline focus:outline-none"
           placeholder="First and Last name"
           required
           type="text"/>
    <label class="block text-teal-600 font-semibold mb-1" for="card-element">Card</label>
    <div id="card-element" class="px-3 py-1.5 mb-4 rounded-lg border bg-gray-100 text-gray-600 focus:outline-none"
         @change="displayCardErrors"></div>
<!--    <p id="card-errors" class="text-red-500 pb-4 pt-2" role="alert" >{{ cardErrors }}</p>-->
    <button class="font-semibold text-red-400 hover:text-red-600 focus:outline-none ml-1" type="button"
            @click.prevent="cancel">
      Cancel
    </button>
    <button class="btn-base absolute right-0 mr-3" type="submit">Submit</button>
  </form>
</template>

<script>
import {loadStripe} from "@stripe/stripe-js";

export default {
  name: "PaymentItem",
  props: {
    formStyle: {
      type: String,
      default: 'w-full relative rounded-lg p-3 border-2 border-red-300'
    }
  },
  data() {
    return {
      stripe: undefined,
      elements: undefined,
      card: undefined,
      fullName: '',
      errorMsg: ''
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    nameErrors: function () {
      if (this.fullName.split(' ').length !== 2) {
        return 'Name field should be two words'
      }
      return '';
    },
    cardErrors: function () {

      return (this.errorMsg);
    }
  },
  methods: {
    displayCardErrors(e) {
      if (e.error) {
        this.errorMsg = e.error.message;
      } else {
        this.errorMsg = '';
      }
    },

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
      this.card.mount("#card-element");

    },
    // Create stripe payment method from user input
    attemptPayment() {
      this.stripe.createPaymentMethod(
          {
            type: 'card',
            card: this.card,
            billing_details: {name: this.fullName}
          })
          .then((result) => {
            if (result.error) {
              // TODO handle errors

              console.log(result.error);
            } else {
              this.createSubscription(result.paymentMethod.id);
            }
          })
    },
    // Post payment method to endpoint to create subscription with stripe
    createSubscription(cardId) {
      this.$client.api.post(
          "/custom/stripe/create-subscription",
          {cardId: cardId, id: this.$route.params.id})
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
    },
    // Emit cancel status and clear form
    cancel() {
      this.$emit("cancel");
      this.fullName = '';
      this.card.clear();
    }
  }
}
</script>

<style>
/* Styling for stripe element on :focus */
.StripeElement--focus {
  box-shadow: 0 0 0 4px rgba(255, 100, 100, 0.62);
}

</style>