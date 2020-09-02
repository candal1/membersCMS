<template>
   <form class="relative w-full" @submit.prevent>
     <input
         id="inputField"
         class="w-1/2 py-1 pl-1 mt-1 mb-1 border rounded outline-none bg-gray-100 disabled:border-none disabled:bg-white focus:shadow-outline"
         :type="inputType"
         :placeholder="text"
         v-model="newText"
         ref="input"
         :disabled="editing === false"
      />
      <button class="absolute right-0 px-5 mt-2 btn-base disabled-fade" v-show="!editing" type="button" @click="edit" :disabled="busy === true">
         Edit
      </button>
      <div v-show="editing" class="absolute right-0 inline-flex mt-2">
         <button class="font-semibold text-red-400 hover:text-red-600 focus:outline-none" type="button" @click="cancel">cancel</button>
         <button class="ml-1 btn-base" type="submit" @click="submitChange" :disabled="newText.length === 0">Submit</button>
      </div>
   </form>
</template>

<script>
import { mapActions } from 'vuex';
import { input } from './InputMixins';
export default {
   name: 'InputItem',
   mixins: [input],
   props: {
      type: String,
   },
   computed: {
      inputType: function() {
         return this.type === 'name' ? 'text' : 'email';
      },
   },
   methods: {
      ...mapActions({ setAlert: 'alert/error', updateField: 'account/updateField' }),
     submitChange: function () {
       let fields; // stores either email or names
       let stop = false;
       let names;
       // select fields to post and detect string errors
       switch (this.type) {
         case 'name':
           names = this.newText.split(' ');
           if (names.length !== 2) {
             this.emitAlert('error', 'Name must be two words: First and Last');
             this.newText = this.text;
             stop = true;
             break;
           }
           fields = {first_name: names[0], last_name: names[1]};
           break;
         case 'email':
           if (this.newText.length === 0) {
             stop = true;
             this.emitAlert('error', 'Email should not be blank');
             this.newText = this.text;
           }
           fields = {email: this.newText};
           break;
       }
       if (!stop) {
         // in case invalid name change args
         // request field(s) change
         this.$client
             .updateUser(this.$route.params.id, fields)
             .then(() => {
               this.updateField([this.type, this.newText]);
               this.emitAlert('success', this.type.charAt(0).toUpperCase() + this.type.slice(1) + ' changed successfully');
             })
             .catch((error) => {
               this.cancel();
               this.emitAlert('failure', error); //TODO parse error msg
             });
       }
       this.$refs.input.blur();
       this.editing = !this.editing;
     },
   },
};
</script>

<style scoped>
/* adjust input margins on disabled */
#inputField:disabled {
   margin-bottom: 6px;
}
</style>
