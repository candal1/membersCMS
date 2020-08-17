<template>
   <div class="w-full">
      <div v-for="(item, index) in commentItems" :key="item.key" class="relative flex justify-between pt-5 pb-10 pl-4 pr-10 mb-2 text-gray-600 bg-white border rounded shadow-md">
         <p>
            {{ item.message }}
         </p>
         <p class="absolute bottom-0 right-0 pb-2 pr-2 text-sm font-semibold tracking-wide text-teal-600">
            <span class="pr-2 text-xs italic tracking-normal underline">{{ item.created }}</span
            >{{ item.username }}
         </p>
         <button
            v-if="userId == item.userid"
            title="Delete comment"
            @click="deleteComment(item.key, index)" 
            class="absolute top-0 right-0 m-1 mt-3 mr-3 transition duration-200 ease-out transform rounded-full opacity-50 hover:scale-125 focus:outline-none hover:opacity-100"
         >
            <img class="w-6 h-auto rounded-full " src="@/assets/button_x.png" alt="X button" />
         </button>
      </div>
   </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
   name: 'CommentList',
   props: {
      lessonid: [Number, String],
      newCommentID: Number,
      userId: [Number, String],
   },
   data() {
      return {
         commentItems: [],
      };
   },
   created() {
      this.getAllComments();
   },
   watch: {
      newCommentID: function() {
         if (this.newCommentID != -1) {
            this.getComment(this.newCommentID);
         }
      },
   },
   methods: {
      ...mapActions({
         setAlert: "alert/error",
      }),
      getAllComments() {
         // get all comments for the given lesson
         this.$client
            .getItems("messages", {
               fields: "id,msg,created_on,user.first_name,user.last_name,user.id",
               filter: {
                  lessonid: this.lessonid,
               },
            })
            .then((items) => {
               items["data"].forEach((item) => {
                  this.commentItems.unshift({
                     key: item["id"],
                     message: item["msg"],
                     username: this.userId == item["user"]["id"] ? "You" : item["user"]["first_name"] + " " + item["user"]["last_name"],
                     userid: item["user"]["id"],
                     created: this.parseDate(item["created_on"]),
                  });
               });
            })
            .catch((error) => {
               this.setAlert(error);
            });
      },
      getComment(key) {
         // get a single comment by id
         this.$client
            .getItems("messages", {
               fields: "id,msg,created_on,user.first_name,user.last_name,user.id",
               filter: {
                  id: key,
               },
            })
            .then((item) => {
               // we don't need the username or created by when posting an new message
               this.commentItems.unshift({
                  key: item["data"][0]["id"],
                  message: item["data"][0]["msg"],
                  username: "You",
                  userid: item["data"][0]["user"]["id"],
                  created: "just now by",
               });
            })
            .catch((error) => {
               this.setAlert(error);
            });
      },
      deleteComment(key, index) {
         // delete one comment by id
         if (this.userId == this.commentItems[index]["userid"]) {
            this.$client.deleteItem("messages", key); //TODO check promise
            this.commentItems.splice(index, 1);
         }
      },
      // parses an iso datetime string as days ago, simplyifying time as hours,days,months,years as approptiate
      parseDate(isostr) {
         var parts = isostr.match(/\d+/g);
         parts = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);

         var offset = parts.getTimezoneOffset() * 60 * 1000;

         // calculate days since post
         var today = new Date();
         var increment;
         var duration = (today.getTime() - parts.getTime() + offset) / (1000 * 60);

         // TODO this could be refactored
         // show minutes if less than 60 mins
         if (duration < 60) {
            duration = duration < 0.5 ? 1 : duration;
            increment = duration < 1.5 ? " minute" : " minutes";
         }
         // show hours if less than 24 hours
         else if (duration < 60 * 24) {
            duration = duration / 60;
            increment = duration < 1.5 ? " hour" : " hours";
         }
         // show days if less then a month
         else if (duration < 30 * 24 * 60) {
            duration = duration / (24 * 60);
            increment = duration < 1.5 ? " day" : " days";
         }
         // show months if less than 1 year
         else if (duration < 365 * 24 * 60) {
            duration = duration / (24 * 60 * 30);
            increment = duration < 1.5 ? " month" : " months";
         }
         //show years
         else {
            duration = duration / (24 * 60 * 365);
            increment = duration < 1.5 ? " year" : " years";
         }

         // show years
         // using math.round to "roughly" estimate time ago
         return Math.round(duration) + increment + " ago by ";
      },
   },
};
</script>
