<template>
  <div v-if="alertMessage">
    <!-- filter placed beneath modal to capture clicks and prevent outside interaction -->
    <div class="absolute z-30 w-screen h-screen" @click.capture="clear"></div>
    <!-- Main Alert modal -->
    <transition name="fade">
      <div id="main" class="bg-white text-red-500 max-w-md rounded-md border-2 border-red-300 shadow-2xl z-50">
        <div class="border-b border-red-300 w-full px-5 py-3 relative">
          <h4 class="inline font-bold pr-2">Error:</h4>
          <button class="mr-5 absolute right-0 transition ease-out duration-200 transform hover:scale-125 focus:outline-none rounded-full opacity-50 hover:opacity-100"
                  @click="clear">
            <img alt="" class="w-5 h-auto rounded-full" src="../assets/button_x.png"/>
          </button>
        </div>
        <p class="font-semibold p-5">{{ alertMessage }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
// AlertModal:
// Alert modal used to "popup" over the screen to display error messages 
import {mapState, mapActions} from 'vuex';

export default {
  name: 'AlertModal',
  computed: {
    ...mapState({
      alertMessage: (state) => state.alert.message,
      loggedIn: (state) => state.account.status.loggedIn
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear',
    }),
    clear() {
      // push to home if we
      if (this.$router.currentRoute.path !== '/login' && this.loggedIn) {
        this.$router.push('/');
      }
      this.clearAlert();
    }
  },
};
</script>

<style scoped>
#main {
  position: fixed;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fade-enter-active {
  transition: opacity 0.21s ease;
}

.fade-leave-active {
  opacity: 0;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
