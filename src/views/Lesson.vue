<template>
    <div class="flex flex-col items-center mt-12 md:mt-24 mb-12 mx-auto max-w-6xl">
        <div v-if="loaded" class="text-teal-600 rounded-lg shadow-lg py-8 px-10 bg-white w-full">
            <h1 class="text-4xl text-center pb-5">{{title}}</h1>
            <span v-html="page_data" class="flex flex-col items-center gap-10 container"/> <!--TODO consider sanitizing v-html content -->
        </div>
        <div v-else class="w-full rounded-lg shadow-lg px-10 py-8 bg-white">
            <h1 class="text-4xl bg-gray-300 text-gray-300 rounded-lg text-center mb-5">NULL</h1>
            <p class="text-center bg-gray-200 text-gray-200 rounded-lg mb-2 h-64">NULL</p>
        </div>
        <router-link class="btn-teal mt-8 ml-auto" to="/lessons">Back to Lessons</router-link>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    
    export default {
        name: 'Lesson',
        data() {
            return {
                page_data: '',
                title: ''
            }
        },
        computed: {
            // show skelaton until page_data and title have data 
            loaded: function () {
                return (this.page_data != '') && (this.title != '');
            }
        },
        created () {
            // pull in page_data and header from directus using the pKey from the selected card on the lessons page
            this.$client.getItems('lessons', { fields: 'page_data,card_header', filter: { id: this.$route.params.key }})
            .then( lesson => {
                localStorage.setItem('lesson_data', JSON.stringify(lesson));
                this.page_data = lesson['data'][0]['page_data'];
                this.title = lesson['data'][0]['card_header'];
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

