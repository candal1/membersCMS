<template>
<div class="flex justify-center">
  <div class="grid gap-5 m-10 mt-20 p-10 rounded text-gray-600">
    <h1 class="header-style font-semibold border-b">{{ header }}</h1>
    <span v-html="text"></span>
  </div>
  </div>
</template>

<script>
import DirectusSDK from "@directus/sdk-js";

  export default {
    name: 'About',
    data () {
      return {
          header: '',
          text: ''
      }
    },
    created () {
      const client2 = new DirectusSDK({url: "http://localhost:8082", project: "_"});
      client2.getItems("about_page")
      .then (data => {
        this.header = data['data'][0]['header'];
        this.text = data['data'][0]['body2'];
        })

    }
  }
</script>
