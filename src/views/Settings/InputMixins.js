// input: 
// mixins for InputItem and PasswordItem components
export const input = {
   props: {
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
   watch: {
      editing: function() {
         this.$emit('status-change', this.editing);
      },
   },
   methods: {
      // enable editing; give focus to input
      edit() {
         this.editing = !this.editing;
         this.newText = '';
         this.$nextTick(() => {
            this.$refs.input.focus();
         });
      },
      //reset
      cancel() {
         this.newText = this.text;
         this.editing = false;
      },
      // emit alerts
      emitAlert(type, msg) {
         this.$emit('alert-event', { type: type, message: msg });
      },
   },
};
