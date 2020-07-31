<template>
   <form class="w-full relative">
      <input class="w-1/2 disabled:bg-white focus:shadow-outline outline-none rounded-md pl-1 py-1" type="text" :placeholder="text" v-model="newText" ref="input" :disabled="editing == false" />
      <button class="btn-base absolute right-0 px-5 disabled:cursor-not-allowed disabled:text-teal-800" v-show="!editing" @click="edit" :disabled="busy == true">
         Edit
      </button>
      <div v-show="editing" class="inline">
         <button class="text-red-400 font-semibold hover:text-red-600 absolute right-0 mr-16 pr-2" @click="cancel">cancel</button>
         <button class="btn-base absolute right-0" @click="submitChange">Submit</button>
      </div>
   </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
   name: 'inputItem',
   components: {},
   props: {
      type: String,
      text: String,
      busy: Boolean,
   },
   data() {
      return {
         editing: false,
         newText: '',
      };
   },
   created() {
      this.newText = this.text;
   },
   computed: {},
   watch: {
      editing: function() {
         this.$emit('status-change', this.editing);
      },
   },
   methods: {
      ...mapActions({ setAlert: 'alert/error', updateField: 'account/updateField' }),
      submitChange() {
         var fields; // stores either email or names
         var stop = false;
         // make fields obj to send request
         switch (this.type) {
            case 'name':
               var names = this.newText.split(' ');
               if (names.length != 2) {
                  this.setAlert('Name must be two words: First and Last');
                  this.newText = this.text;
                  stop = true;
                  break;
               }
               fields = { first_name: names[0], last_name: names[1] };
               break;
            case 'email':
               fields = { email: this.newText };
               break;
         }
         if (!stop) {
            // in case invalid name change args
            // request field(s) change
            this.$client
               .updateUser(this.$route.params.id, fields)
               .then(() => {
                  this.updateField([this.type, this.newText]);
               })
               .catch((error) => {
                  this.setAlert(error);
               });
         }
         this.editing = !this.editing;
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
