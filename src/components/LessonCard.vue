<template>
    <div class="bg-white max-w-sm lg:max-w-xs w-full overflow-hidden rounded-lg transition-grow-shadow">
        <router-link class="flex flex-col h-full"  :to="{name: 'Lesson', params: {id: pathFromHeader, key: id}}">
            <img class="w-full flex-grow object-cover" :src="imgSrc" :alt="imgAlt">
            <div class="px-5 pb-5 pt-2 flex-grow-0">
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
            body: String,
            id: Number
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