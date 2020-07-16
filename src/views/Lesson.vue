<template>
    <div>
        <div id="page" class="flex flex-col items-center">
            <div :class="style">
                <h1 class="text-4xl text-center pb-5">{{title}}</h1>
                <span v-html="page_data" class="flex flex-col items-center gap-10 container"/> <!--TODO consider sanitizing v-html content -->
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    
    export default {
        name: 'Lesson',
        data() {
            return {
                style: '',
                loadedStyle: 'max-w-sm md:max-w-6xl text-teal-600 border rounded-lg shadow-lg px-10 py-8 mx-3 bg-white',
                page_data: '',
                title: ''
            }
        },
        created () {
            // pull in page_data from directus using the pKey from the selected card on the lessons page
            this.$client.getItems('lessons', { fields: 'page_data,card_header', filter: { id: this.$route.params.key }})
            .then( lesson => {
                localStorage.setItem('lesson_data', JSON.stringify(lesson));
                this.page_data = lesson['data'][0]['page_data'];
                this.title = lesson['data'][0]['card_header'];
                this.style= this.loadedStyle;
            })
            .catch( error => {
                //this.setAlert(error)
                console.log(error);
            })
        },
        methods: {
            ...mapActions({ setAlert: 'alert/error'})
        }
    }
</script>

<style scoped>
#page {
    min-height: 40rem;
    
}
/* iframe {
    width: 100%;
    height: 100%;
} */
</style>