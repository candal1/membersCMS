<template>
    <div class="md:flex justify-center gap-10 md:mt-20">
        <LessonCard class="flex-grow m-5" v-for="lesson in lessons" :key="lesson.heading" :imgSrc="lesson.imgSource" :imgAlt="lesson.imgAlt" :heading="lesson.heading" :body="lesson.body"/>
    </div>
</template>

<script>
   import LessonCard from '@/components/LessonCard.vue'
    export default {
        name: 'Lessons',
        components: {
            LessonCard
        },
        data () {
            return {
                lessons: [
                    {
                        imgSource: require('../assets/lessons/reiki.jpg'),
                        imgAlt: 'reiki hands',
                        heading: 'Reiki Workshop',
                        body: 'Reiki is one of the simplest, and possibly most effective methods of holistic healing in the civilized world.'
                    },
                    
                    {
                        imgSource: require('../assets/dhh_tran.png'),
                        imgAlt: 'reiki',
                        heading: 'Reiki',
                        body: 'Reiki is a thing'
                    }
                ]
            }
        },
        created () {
            this.$client.getItems('lessons')
            .then( data => {
                console.log(JSON.stringify(data));
            })
            .catch( error => {
                console.log(JSON.stringify(error));
            })
        }
    }
</script>