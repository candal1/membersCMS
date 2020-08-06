<template>
   <div :class="selectStyles">
      <h1 class="mr-2 font-semibold tracking-wider">{{ displayType }}</h1>
      <p>{{ message }}</p>
      <button class="ml-2 transition duration-200 ease-out transform rounded-full opacity-50 hover:opacity-100 focus:outline-none" type="button" @click="clear">
         <img class="w-5 h-auto rounded-full " src="@/assets/button_x.png" alt="X button" />
      </button>
   </div>
</template>

<script>
// AlertItem:
// Prop based alert component used to provide success/error
export default {
   name: 'AlertItem',
   props: {
      type: {
         // expect certain strings

         type: String,
         validator: function(value) {
            return ['success', 'error', 'failure'].indexOf(value) !== -1;
         },
      },
      message: String,
   },
   data() {
      return {
         // Case for selecting css styling on state changes
         // defaults to a 0 opacity div that is equal height to base style
         hidden: 'flex text-lg border-2 opacity-0 mt-2 mb-5',
         base: 'flex items-center max-w-md px-2 text-lg border-2 rounded opacity-75 mt-2 mb-5',
         successStyles: 'bg-green-100 border-green-600 text-green-600',
         failureStyles: 'bg-red-100 border-red-500 text-red-500',
      };
   },
   computed: {
      selectStyles: function() {
         switch (this.type) {
            case 'success':
               return this.base + ' ' + this.successStyles;
            case 'failure': // case fall through (failure || error) 
            case 'error':
               return this.base + ' ' + this.failureStyles;
            default:
               return this.hidden;
         }
      },
      displayType: function() {
         //Put
         return this.type.charAt(0).toUpperCase() + this.type.slice(1) + '!';
      },
   },
   methods: {
      clear() {
         this.$emit('clear-alert');
      },
   },
};
</script>

<style scoped></style>
