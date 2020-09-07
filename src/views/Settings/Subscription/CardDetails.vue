<template>
  <div class="absolute mt-8">
    <h2 class="font-semibold text-teal-600 pt-0">Card</h2>
    <p class="py-1" title="Name on Card">Cole Kendall</p>
    <p class="inline mr-2 py-1" title="Card Number">****5647</p>
    <p class="inline py-1" title="Expiration Date">06/2025</p>
    <button class="btn-base absolute right-0" @click.prevent="edit">Change</button>
  </div>
</template>

<script>
export default {
  name: "CardDetails",
  methods: {
    edit() {
      this.$emit('edit');
    }
  }
}
</script>
