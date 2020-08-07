<template>
   <form class="relative w-full" @submit.prevent>
      <div class="relative inline-flex w-1/2 mb-1 rounded-md focus-within:shadow-outline disabled-div" :disabled="editing == false">
         <input class="w-full py-1 pl-1 rounded outline-none disabled:bg-white" :type="type" :placeholder="text" v-model="newText" :disabled="editing == false" ref="input" />
         <button class="absolute right-0 w-6 h-6 mt-1 mr-1 focus:outline-none" type="button" v-show="editing" @mousedown="showPass" @mouseup="hidePass" @mouseleave="hidePass" @touchstart="showPass" @touchend="hidePass">
            <img class="opacity-25 appearance-none hover:opacity-75" :src="img" />
         </button>
      </div>
      <button class="absolute right-0 px-5 btn-base disabled:cursor-not-allowed disabled:text-teal-800" type="button" v-show="!editing" @click="edit" :disabled="busy == true">
         Edit
      </button>
      <div class="inline" v-show="editing">
         <button class="absolute right-0 pr-2 mr-16 font-semibold text-red-400 hover:text-red-600" type="button" @click="cancel">
            cancel
         </button>
         <button class="absolute right-0 btn-base" type="submit" @click="submitChange">
            Submit
         </button>
      </div>
   </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
   name: 'PasswordItem',
   props: {
      text: String,
      busy: Boolean,
   },
   data() {
      return {
         editing: false,
         newText: '',
         type: 'password',
         img: '',
         showImg: '',
         hideImg: '',
      };
   },
   created() {
      this.newText = this.text;
      this.img = require('@/assets/show-pass.png');
      this.showImg = this.img;
      this.hideImg = require('@/assets/hide-pass.png');
   },
   watch: {
      editing: function() {
         this.$emit('status-change', this.editing);
      },
   },
   methods: {
      ...mapActions({ setAlert: 'alert/error' }),
      submitChange() {
         const len = this.newText.length;
         if (len == 0) {
            this.emitAlert('error', 'Password should not be blank');
            this.cancel();
         } else {
            this.$client
               .updateUser(this.$route.params.id, { password: this.newText })
               .then(() => {
                  this.emitAlert('success', 'Password changed succesfully');
               })
               .catch((error) => {
                  this.cancel();
                  this.emitAlert('failure', error); // TODO parse error msg
               });

            this.newText = '*'.repeat(len);
            this.editing = !this.editing;
            this.$refs.input.blur();
         }
      },
      showPass() {
         this.type = 'text';
         this.img = this.hideImg;
      },
      hidePass() {
         this.type = 'password';
         this.img = this.showImg;
      },
      edit() {
         // change conditionals and give focus to input
         this.editing = !this.editing;
         this.newText = '';
         this.$nextTick(() => {
            this.$refs.input.focus();
         });
      },
      cancel() {
         this.newText = this.text;
         this.editing = false;
      },
      emitAlert(type, msg) {
         this.$emit('alert-event', { type: type, message: msg });
      },
   },
};
</script>