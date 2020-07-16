<template>
    <div>
        <!-- <div id="page" class="flex flex-col md:flex-row justify-center content-center items-center md:gap-10 py-10"> -->
        <div id="page" class="flex flex-col md:flex-row flex-wrap justify-center content-center items-center md:gap-10 py-24 ">
            <LessonCard v-for="lesson in lessonsArray" :key="lesson.heading" :imgSrc="lesson.imgSource" :imgAlt="lesson.imgAlt" :heading="lesson.heading" :body="lesson.body" :id="lesson.id" :loaded="lesson.loaded" />
        </div>
    </div>
</template>

<script>
    import LessonCard from '@/components/LessonCard.vue'
    import { mapActions } from 'vuex'
    export default {
        name: 'Lessons',
        components: {
            LessonCard
        },
        data () {
            return {
                initlength: 0,
                lessonsArray: [
                    {
                        imgSource: require('../assets/skelatonImg.png'),
                        imgAlt: 'reiki hands',
                        heading: 'Lorem ipsum dolor',
                        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti illum obcaecati dolorem hic vero quis nulla assumenda veritatis quos.',
                        id: null,
                        loaded: false
                    },
                    {
                        imgSource: require('../assets/skelatonImg.png'),
                        imgAlt: 'reiki hands',
                        heading: 'Lorem ipsum dolor',
                        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti illum obcaecati dolorem hic vero quis nulla assumenda veritatis quos.',
                        id: null,
                        loaded: false
                    },
                    {
                        imgSource: require('../assets/skelatonImg.png'),
                        imgAlt: 'reiki hands',
                        heading: 'Lorem ipsum dolor',
                        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti illum obcaecati dolorem hic vero quis nulla assumenda veritatis quos.',
                        id: null,
                        loaded: false
                    }
                ]
            }
        },
        created () { 
            // Get "published" items from 'lessons' collection
            // we also only request the fields we need as some are used for the specific lesson's page
            this.initLength = this.lessonsArray.length;
            this.$client.getItems('lessons', { fields: 'id,card_image_alt,card_header,card_body,card_image.*', filter: { status: 'published'}})
            .then( lessons => {
                lessons['data'].forEach(item => {
                    this.delayPush(item);
                });
                while(this.initLength > 0){ // clear off any leftover skelaton cards
                    this.lessonsArray.shift()
                    this.initLength--;
                }
            })
            .catch( error => {
                this.setAlert(error)
            })
        },
        methods: {
            ...mapActions({ setAlert: 'alert/error'}),
            delayPush (item) {
                setTimeout(() => {
                    this.lessonsArray.push({
                        imgSource: item['card_image']['data']['full_url'],
                        imgAlt: item['card_image_alt'],
                        heading: item['card_header'],
                        body: item['card_body'],
                        id: item['id'],
                        loaded: true
                    })
                }, 100)
                    if(this.initLength > 0){ // pop skelaton cards off as we load in data
                        this.lessonsArray.shift()
                        this.initlength--;
                    }
            }
        }
    }
</script>

<style scoped>
#page {
    min-height: 42rem;
}
</style>