<template>
   <div class="w-full">
      <p></p>
      <form @submit.prevent="postComment" class="text-gray-600 relative pb-4">
         <textarea class="input-base shadow-md" name="msg" v-model="message" maxlength="400" cols="60" rows="5" placeholder="Leave a comment, ask a question..."></textarea>
         <span class="opacity-50 absolute bottom-0 right-0 mr-24 pr-4 mb-5">{{ message.length }}</span>
         <button class="btn-teal absolute bottom-0 right-0 mr-6 disabled:bg-teal-800 disabled:text-gray-400 disabled:cursor-not-allowed" :disabled="userId == -1 || message.length == 0">Submit</button>
      </form>
   </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
   name: 'CommentForm',
   props: {
      lessonid: [Number, String],
      userId: [Number, String],
   },
   data() {
      return {
         message: "",
      };
   },

   methods: {
      ...mapActions({ setAlert: "alert/error" }),
      postComment() {
         // submit msg to directus messages collection
         this.$client
            .createItem("messages", {
               user: this.userId.toString(10),
               status: "unread",
               msg: this.message,
               lessonid: this.lessonid,
            })
            .then((promise) => {
               // console.log(promise)
               // clear the message and emit event to add new item to comment list
               this.message = "";
               this.$emit("new-comment", parseInt(JSON.stringify(promise["data"]["id"]), 10));
            })
            .catch((error) => {
               this.setAlert(error);
            });
      },
   },
};
</script>
