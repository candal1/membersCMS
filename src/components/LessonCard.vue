<template>
    <div class="shadow-lg bg-white max-w-xs rounded-lg overflow-hidden transition-grow">
        <router-link class="block" :to="head">
        <img class="w-full" :src="imgSrc" :alt="imgAlt">
        <div class="p-5">
            <h2 class="font-semibold text-2xl text-teal-600 border-b" >{{ heading }}</h2>
            <p class="text-gray-600 mt-2">{{ body }}</p>
        </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'LessonCard',
        props: {
            imgSrc: String,
            imgAlt: String,
            heading: String,
            body: String
        },
        data () {
            return {
                head: "{name: 'Lesson', params: {id: " + "'"+ this.heading + "'" + " }"
            }
        }
    }
</script>
