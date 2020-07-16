<template>
    <div id="card" class="bg-white max-w-sm lg:max-w-xs w-full overflow-hidden rounded-lg transition-grow-shadow">
        <router-link class="block"  :to="{name: 'Lesson', params: {id: pathFromHeader, key: id}}">
            <img class="w-full" :src="imgSrc" :alt="imgAlt">
            <div class="p-5">
                <h2 class="font-semibold text-2xl text-teal-600 border-b" >{{ heading }}</h2>
                <p class="text-gray-600 mt-2">{{ body }}</p>
            </div>
        </router-link>
        <!-- Code for skelaton cards (unused) -->
        <!-- <div v-else class="block">
            <img class="w-full" :src="imgSrc" :alt="imgAlt">
            <div class="p-5 text-gray-400">
                <h2 class="text-2xl bg-gray-400 rounded-lg" >{{ heading }}</h2>
                <p class="mt-2 bg-gray-400 rounded-lg">{{ body }}</p>
            </div>
        </div> -->
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