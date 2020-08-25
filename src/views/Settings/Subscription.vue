<template>
  <div
      class="flex flex-col items-center w-full max-w-xl pb-10 mx-3 mb-10 px-10 text-gray-600 bg-white rounded-lg shadow-lg">
    <h1 class="header-style">Subscription</h1>
    <div class="border-b px-3 py-2 w-full relative" v-show="!editing">
      <h2 class="text-teal-600 font-semibold pr-3 text-lg">Status:</h2>
      <p class="inline">Inactive (Limited Access)</p>
      <button :disabled="editing === true" @click="editing = true" class="btn-base absolute right-0" type="button">
        Subscribe
      </button>
    </div>
    <div class="w-full">
      <payment-form :editing="editing" @cancel="editing = false"/>
    </div>
  </div>

</template>

<script>
import PaymentItem from "@/views/Settings/PaymentItem";

export default {
  name: "Subscription",
  components: { 'payment-form': PaymentItem },
  data() {
    return {
      editing: false,
    }
  },


}
</script>