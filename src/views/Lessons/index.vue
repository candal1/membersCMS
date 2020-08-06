<template>
   <div class="flex justify-center mt-12 md:mt-24 mb-12 mx-2">
      <div v-show="!loaded" class="flex">
         <span class="page_loader" />
      </div>
      <transition-group id="page" name="fade" class="flex flex-wrap justify-center max-w-10xl">
         <lesson-card v-for="lesson in lessonsArray" :key="lesson.id" :imgSrc="lesson.imgSource" :imgAlt="lesson.imgAlt" :heading="lesson.heading" :body="lesson.body" :id="lesson.id" />
      </transition-group>
   </div>
</template>

<script>
import LessonCard from './LessonCard.vue';

import { mapActions } from 'vuex';

export default {
   name: 'Lessons',
   components: {
      'lesson-card': LessonCard,
   },
   data() {
      return {
         lessonsArray: [],
      };
   },
   computed: {
      loaded: function() {
         return this.lessonsArray.length;
      },
   },
   created() {
      // Get "published" items from 'lessons' collection
      // eslint-disable-next-line no-unused-vars
      // we also only request the fields we need as some are used for the specific lesson's page
      this.$client
         .getItems('lessons', { fields: 'id,card_image_alt,card_header,card_body,card_image.*', filter: { status: 'published' } })
         .then((lessons) => {
            // eslint-disable-next-line no-unused-vars
            lessons['data'].forEach((obj, index) => {
               setTimeout(() => {
                  this.lessonsArray.push({
                     imgSource: obj['card_image']['data']['full_url'],
                     imgAlt: obj['card_image_alt'],
                     heading: obj['card_header'],
                     body: obj['card_body'],
                     id: obj['id'],
                  });
               }, (index + 1) * 20);
            });
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

<style scoped>
#page {
   min-height: 60rem;
}
.fade-enter-active,
.fade-leave-active {
   transition: opacity 1.5s;
}

.fade-enter,
.fade-leave-to {
   opacity: 0;
}
</style>
