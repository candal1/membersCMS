<template>
  <div :class="formStyle">
    <h2 class="header-style text-center py-1">Details</h2>
    <div class="relative h-32">

      <transition name="fade">
        <component :is="select" class="absolute border-b py-2 px-3 w-full z-20" @clear="editing = false"
                   @edit="editing = true"></component>
      </transition>
    </div>
    <div class="border-b px-3 py-2 mb-4">
      <h2 class="font-semibold text-teal-600 pt-0">Plan</h2>
      <p>$5 per month</p>
      <p>Renews: October 1st</p>
      <p class="inline">Cycle: Monthly</p>
      <button class="btn-base absolute right-0 mr-3 hover:enabled:bg-red-200">Unsubscribe</button>
    </div>
    <button class="font-semibold text-red-400 hover:text-red-600 focus:outline-none ml-1"
            @click.prevent="cancel">
      Close
    </button>
  </div>
</template>

<script>
import CardDetails from "@/views/Settings/Subscription/CardDetails";
import CardChange from "@/views/Settings/Subscription/CardChange";

export default {
  name: "DetailsItem",
  components: {'card-details': CardDetails, 'card-change': CardChange},
  props: {
    formStyle: {
      type: String,
      default: 'w-full relative rounded-lg p-3 border-2 border-red-300'
    }
  },
  computed: {
    select: function () {
      return (this.editing) ? 'card-change' : 'card-details';
    }
  },
  data() {
    return {
      editing: false,
      fullName: ''
    }
  },
  methods: {
    // Emit cancel status and clear form
    cancel() {
      this.$emit("cancel");
      this.editing = false;
    },
  }
}
</script>

<style>
.fade-enter-active {
  transition: all 300ms ease-out;
}
.fade-leave-active {
  transition: all 50ms ease-in;
}
.fade-enter {
  transform: translateX(-0.2rem);
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(0.3rem);
  opacity: 0;
}

</style>
