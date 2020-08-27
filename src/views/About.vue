<template>
   <div class="flex justify-center mt-24 mb-12">
      <div v-show="!loaded" class="flex">
         <span class="page_loader" />
      </div>
      <div v-show="loaded" class="max-w-6xl px-10 pb-10 mx-3 text-gray-600 bg-white rounded-lg shadow-lg">
         <h1 class="text-center header-style">{{ header }}</h1>
         <span v-html="text"/> <!--TODO consider sanitizing v-html content -->
      </div>
   </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
   name: 'About',
   data() {
      return {
         header: '',
         text: '',
      };
   },
   computed: {
      loaded: function() {
         return !!this.text;
      },
   },
   beforeMount() {
      this.$client
         .getItems('about_page')
         .then((data) => {
            this.header = data['data'][0]['header'];
            this.text = data['data'][0]['body2'];
         })
         .catch((error) => {
            this.setAlert(error);
         });
   },
   methods: {
      ...mapActions({ setAlert: 'alert/error' }),
   },
};
</script>
