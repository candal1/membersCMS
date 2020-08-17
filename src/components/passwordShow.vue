<!--
    PasswordShow:
    simple password input with ability to show/hide the password text

-->
<template>
   <div class="relative flex items-center w-full h-full leading-tight text-gray-700 bg-white border rounded shadow appearance-none focus-within:outline-none focus-within:shadow-outline">
      <input class="flex-grow p-2 rounded" @input="emitPassword" required :type="fieldType" v-model="password" name="password" :placeholder="placeholder" />
      <button class="absolute right-0 w-10 h-10 focus:outline-none" type="button" @mousedown="toggle" @mouseup="toggle" @mouseleave="reset" @touchstart="toggle">
         <img class="p-2 opacity-25 appearance-none hover:opacity-75" :src="img" />
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
      // toggle hide/show fields
      toggle() {
         this.fieldType = this.fieldType == 'text' ? 'password' : 'text';
         this.img = this.img == this.hideImg ? this.showImg : this.hideImg;
      },
      // reset to defaults
      reset() {
         this.fieldType = 'password';
         this.img = this.hideImg;
      },
      // emit password
      emitPassword() {
         this.$emit('password-update', this.password);
      },
   },
};
</script>
