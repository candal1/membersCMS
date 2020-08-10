<!--
   PasswordItem:   
   passfore
-->
<template>
   <form class="relative w-full" @submit.prevent>
      <div class="relative inline-flex w-1/2 mb-1 rounded-md focus-within:shadow-outline disabled-div" :disabled="editing == false">
         <input class="w-full py-1 pl-1 rounded outline-none disabled:bg-white" :type="type" :placeholder="text" v-model="newText" :disabled="editing == false" ref="input" />
         <button
            class="absolute right-0 w-10 focus:outline-none"
            type="button"
            v-show="editing"
            @mousedown="toggle"
            @mouseup="toggle"
            @mouseleave="reset"
            @touchstart="toggle"
         >
            <img class="px-2 py-1 opacity-25 appearance-none hover:opacity-75" :src="img" />
         </button>
      </div>
      <button class="absolute right-0 px-5 btn-base disabled:cursor-not-allowed disabled:text-teal-800" type="button" v-show="!editing" @click="edit" :disabled="busy == true">
         Edit
      </button>
      <div class="absolute right-0 inline-flex mt-1" v-show="editing">
         <button class="font-semibold text-red-400 hover:text-red-600" type="button" @click="cancel">
            cancel
         </button>
         <button class="ml-1 btn-base" type="submit" @click="submitChange">
            Submit
         </button>
      </div>
   </form>
</template>

<script>
import { mapActions } from 'vuex';
import { input } from './InputMixins';

export default {
   name: 'PasswordItem',
   mixins: [input],
   data() {
      return {
         type: 'password',
         img: '',
         showImg: '',
         hideImg: '',
      };
   },
   created() {
      this.img = require('@/assets/hide-pass.png');
      this.showImg = require('@/assets/show-pass.png');
      this.hideImg = this.img;
   },
   methods: {
      ...mapActions({ setAlert: 'alert/error' }),
      // submit post to directus_user for password change
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
      // toggle hide/show fields
      toggle() {
         this.type = this.type == 'text' ? 'password' : 'text';
         this.img = this.img == this.hideImg ? this.showImg : this.hideImg;
      },
      // reset to defaults
      reset() {
         this.type = 'password';
         this.img = this.hideImg;
      },
   },
};
</script>
