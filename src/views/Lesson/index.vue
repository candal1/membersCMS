<template>
   <div class="flex flex-col items-center gap-8 mt-12 md:mt-24 mb-12 mx-3">
      <span v-if="!loaded" class="page_loader"></span>
      <transition name="fade">
         <div v-if="loaded" class="text-teal-600 relative rounded-lg shadow-lg py-8 px-10 bg-white w-full max-w-6xl">
            <h1 class="text-4xl text-center pb-5">{{ title }}</h1>
            <span v-html="page_data" class="flex flex-col items-center gap-10" />
            <router-link class="bg-teal-500 hover:bg-teal-700 text-white font-bold rounded absolute py-2 px-3 mt-3 mr-10 right-0" to="/lessons">Back to Lessons</router-link>
         </div>
      </transition>
      <transition name="fade">
         <div v-if="loaded" class="max-w-2xl flex flex-col items-center gap-10">
            <h2 class="header-style py-0">Discussion</h2>
            <CommentForm :lessonid="this.$route.params.key" @new-comment="newComment" :userId="userId" />
            <CommentList :lessonid="this.$route.params.key" :newCommentID="newCommentID" :userId="userId" />
         </div>
      </transition>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';

export default {
   name: 'Lesson',
   components: {
      CommentForm,
      CommentList,
   },
   data() {
      return {
         page_data: '',
         title: '',
         newCommentID: -1,
      };
   },
   computed: {
      ...mapState({
         user: (state) => state.account.user,
      }),
      userId: function() {
         if (typeof this.user === 'undefined' || this.user === null) {
            return -1;
         } else {
            return this.user['id'];
         }
      },
      loaded: function() {
         return this.page_data != '' && this.title != '';
      },
   },
   created() {
      // pull in page_data from directus using the pKey from the selected card on the lessons page
      this.$client
         .getItems('lessons', {
            fields: 'page_data,card_header',
            filter: { id: this.$route.params.key },
         })
         .then((lesson) => {
            this.page_data = lesson['data'][0]['page_data'];
            this.title = lesson['data'][0]['card_header'];
         })
         .catch((error) => {
            this.setAlert(error);
         });
   },
   methods: {
      ...mapActions({ setAlert: 'alert/error' }),
      newComment(e) {
         this.newCommentID = e;
      },
   },
};
</script>

<style scoped>
#body {
   min-height: 20rem;
}

.fade-enter-active {
   transition: opacity 1s;
}
.fade-leave-active {
   opacity: 0;
}
.fade-enter,
.fade-leave-to {
   opacity: 0;
}
</style>
