<!--
    passwordShow:
    simple password input with ability to show/hide the password text

-->
<template>
    <div class="flex items-center shadow appearance-none border rounded w-full h-full py-2 px-3 text-gray-700 leading-tight focus-within:outline-none focus-within:shadow-outline" >
        <input class="flex-grow" @input="emitPassword" required :type="fieldType" v-model="password" name="password" placeholder="Password">
        <button class="flex-grow-0 w-6 h-6 focus:outline-none m-0" type="button" @mousedown="showPass" @mouseup="hidePass" @mouseleave="hidePass"><img class="appearance-none opacity-25 hover:opacity-75" :src="imgSource"></button>
    </div>
</template>

<script>
    //TODO disable required input and setup formal validation
    export default {
       name: 'passwordShow',
       data () {
            return {
               password: '',
               fieldType: 'password',
               imgSource: '',
               image1: '',
               image2: ''
            }
       },
       created () {
           this.imgSource = require('../assets/show-pass.png') 
           this.image1 = this.imgSource
           this.image2 = require('../assets/hide-pass.png')
       },
       methods: {
           showPass () {
               this.fieldType = 'text';
               this.imgSource = this.image2;
           },
           hidePass () {
               this.fieldType = 'password';
               this.imgSource = this.image1;
           },
           emitPassword () {
               this.$emit('password-update', this.password);
           }
       } 
    }
</script>
