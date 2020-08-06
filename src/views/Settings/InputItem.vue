<template>
   <form class="relative w-full" @submit.prevent>
      <input id="input" class="w-1/2 py-1 pl-1 mt-1 mb-1 border rounded outline-none disabled:border-none disabled:bg-white focus:shadow-outline" :type="inputType" :placeholder="text" v-model="newText" ref="input" :disabled="editing == false" />
      <button class="absolute right-0 px-5 py-1 btn-base" v-show="!editing" type="button" @click="edit" :disabled="busy == true">
         Edit
      </button>
      <div v-show="editing" class="inline">
         <button class="absolute right-0 pr-2 mt-1 mr-16 font-semibold text-red-400 hover:text-red-600" type="button" @click="cancel">cancel</button>
         <button class="absolute right-0 py-1 btn-base" type="submit" @click="submitChange">Submit</button>
      </div>
   </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
   name: 'InputItem',
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
   computed: {
      inputType: function() {
         return this.type == 'name' ? 'text' : 'email';
      },
   },
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
         // select fields to post and detect string errors
         switch (this.type) {
            case 'name':
               var names = this.newText.split(' ');
               if (names.length != 2) {
                  this.emitAlert('error', 'Name must be two words: First and Last');
                  this.newText = this.text;
                  stop = true;
                  break;
               }
               fields = { first_name: names[0], last_name: names[1] };
               break;
            case 'email':
               if (this.newText.length == 0) {
                  stop = true;
                  this.emitAlert('error', 'Email should not be blank');
                  this.newText = this.text;
               }
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
                  this.emitAlert('success', this.type.charAt(0).toUpperCase() + this.type.slice(1) + ' changed succesfully');
               })
               .catch((error) => {
                  this.cancel();
                  this.emitAlert('failure', error); //TODO parse error msg
               });
         }
         this.$refs.input.blur();
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
      emitAlert(type, msg) {
         this.$emit('alert-event', { type: type, message: msg });
      },
   },
};
</script>

<style scoped>
/* adjust input margins on disabled */
#input:disabled {
   margin-bottom: 6px;
}
</style>