<template>
  <div class="flex justify-center mt-24 mb-12">
    <div class="px-10 pb-10 rounded-lg shadow-lg text-gray-600 bg-white max-w-6xl mx-3">
      <h1 class="header-style font-semibold text-center">{{ header }}</h1>
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
