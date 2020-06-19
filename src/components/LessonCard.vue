<template>
    <div class="shadow-lg bg-white max-w-xs rounded-lg overflow-hidden transition-grow">
        <router-link class="block" :to="{name: 'Lesson', params: {id: pathFromHeader}}">
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
        computed: {
            // Lower, trim and replace spaces in card header, 
            // for dynamic route names on card selection `
            pathFromHeader: function () {
                return this.heading.toLowerCase().trim().replace(/\s+/g, "-");
            }
        }
    }
</script>
