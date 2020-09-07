<template>
  <div
      class="flex flex-col items-center w-full max-w-xl pb-10 gap-4 mb-10 px-3 md:px-6 lg:px-10 text-gray-600 bg-white rounded-lg shadow-lg">
    <h1 class="header-style">Subscription</h1>
    <div :disabled="editing === true" class="border-b px-3 py-2 w-full relative disabled-fade">
      <h2 class="text-teal-600 font-semibold pr-3 text-lg">Status</h2>
      <p class="inline">{{ accountStatus }}</p>
      <button :disabled="editing === true" class="btn-base absolute right-0" type="button" @click="editing = true">
        {{ (active) ? 'Manage' : 'Subscribe' }}
      </button>
    </div>
    <transition name="slide" @after-enter="formHidden = false" @before-leave="formHidden = true">
      <payment-form v-show="editing && !active" :formStyle="formStyle" @cancel="editing = false"/>
    </transition>
    <transition name="slide" @after-enter="formHidden = false" @before-leave="formHidden = true">
      <details-item v-show="editing && active" :formStyle="formStyle" @cancel="editing = false"/>
    </transition>
  </div>
</template>

<script>
import PaymentItem from "@/views/Settings/Subscription/PaymentItem";
import DetailsItem from "@/views/Settings/Subscription/DetailsItem";
import {mapState} from 'vuex';

export default {
  name: "Subscription",
  components: {'payment-form': PaymentItem, 'details-item': DetailsItem},
  data() {
    return {
      editing: false,
      formHidden: true
    }
  },
  computed: {
    ...mapState({active: state => state.account.user.subscription}),
    formStyle: function () {
      if (this.formHidden) {
        return 'w-full relative rounded-lg px-3 border-2 border-red-300'
      } else {
        return 'w-full relative rounded-lg p-3 border-2 border-red-300'
      }
    },
    accountStatus: function () {
      return (this.active) ? 'Active (Full Access)' : 'Inactive (Limited Access)';
    },

  }
}
</script>

<style>
/* Classes for "slide down appear" transition on payment form */
.slide-enter-active,
.slide-leave-active {
  -moz-transition: all 0.3s ease-in;
  -webkit-transition: all 0.3s ease-in;
  -o-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.slide-enter-to, .slide-leave {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  opacity: 1;
  max-height: 303px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  padding-bottom: 0;
  padding-top: 0;
  opacity: 0.1;
  max-height: 0;
  overflow: hidden;
}
</style>