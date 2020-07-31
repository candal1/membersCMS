<template>
   <form class="w-full relative">
      <div class="w-1/2 inline-flex focus-within:shadow-outline rounded-md relative">
         <input class="disabled:bg-white rounded-lg pl-1 py-1 outline-none" :type="type" :placeholder="text" v-model="newText" :disabled="editing == false" ref="input" />
         <button class="w-6 h-6 focus:outline-none mt-1 mr-1 absolute right-0" type="button" v-show="editing" @mousedown="showPass" @mouseup="hidePass" @mouseleave="hidePass">
            <img class="appearance-none opacity-25 hover:opacity-75 " :src="img" />
         </button>
      </div>
      <button class="btn-base absolute right-0 px-5 disabled:cursor-not-allowed disabled:text-teal-800" v-show="!editing" @click="edit" :disabled="busy == true">
         Edit
      </button>
      <div class="inline" v-show="editing">
         <button class="text-red-400 font-semibold hover:text-red-600 absolute right-0 mr-16 pr-2" @click="cancel">
            cancel
         </button>
         <button class="btn-base absolute right-0" @click="submitChange">
            Submit
         </button>
      </div>
   </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
   name: 'passwordItem',
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
      this.img = require('../assets/show-pass.png');
      this.showImg = this.img;
      this.hideImg = require('../assets/hide-pass.png');
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
         this.$client.updateUser(this.$route.params.id, { password: this.newText }).catch((error) => {
            this.setAlert(error);
         });
         this.newText = '*'.repeat(len);
         this.editing = !this.editing;
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
   },
};
</script>
