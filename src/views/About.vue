<template>
<div class="flex justify-center">
  <div class="grid gap-5 m-10 mt-20 p-10 rounded text-gray-600">
    <h1 class="header-style font-semibold">{{ header }}</h1>
    <span v-html="text"/> <!--TODO consider sanitizing v-html content -->
  </div>
  </div>
</template>

<script>
  export default { 
    name: 'About',
    data () {
      return {
          header: '',
          text: ''
      }
    },
    beforeMount () {
      this.$client.getItems("about_page")
      .then (data => {
        this.header = data['data'][0]['header'];
        this.text = data['data'][0]['body2'];
        })
      .catch( error => {
        this.text = error['info']['error']['message'];
        localStorage.setItem('error', JSON.stringify(error))
      })

    }
  }
</script>
