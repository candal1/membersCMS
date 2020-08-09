<!--
    PasswordShow:
    simple password input with ability to show/hide the password text

-->
<template>
   <div class="relative flex items-center w-full h-full leading-tight text-gray-700 bg-white border rounded shadow appearance-none focus-within:outline-none focus-within:shadow-outline">
      <input class="flex-grow p-2 rounded" @input="emitPassword" required :type="fieldType" v-model="password" name="password" :placeholder="placeholder" />
      <button
         class="absolute right-0 w-6 h-6 mr-2 focus:outline-none"
         type="button"
         @mousedown="showPass"
         @mouseup="hidePass"
         @mouseleave="hidePass"
         @touchstart="showPass"
         @touchend="hidePass"
         @touchcancel="hidePass"
      >
         <img class="opacity-25 appearance-none hover:opacity-75" :src="imgSource" />
      </button>
   </div>
</template>

<script>
export default {
   name: 'PasswordShow',
   props: {
      placeholder: String,
   },
   data() {
      return {
         password: '',
         fieldType: 'password',
         imgSource: '',
         image1: '',
         image2: '',
      };
   },
   created() {
      this.imgSource = require('@/assets/show-pass.png');
      this.image1 = this.imgSource;
      this.image2 = require('@/assets/hide-pass.png');
   },
   methods: {
      // show/hide fields
      showPass() {
         this.fieldType = 'text';
         this.imgSource = this.image2;
      },
      hidePass() {
         this.fieldType = 'password';
         this.imgSource = this.image1;
      },
      // emit password
      emitPassword() {
         this.$emit('password-update', this.password);
      },
   },
};
</script>
