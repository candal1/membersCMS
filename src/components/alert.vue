<template>
    <div class=" absolute inline-flex items-center border-2 border-red-300 bg-red-100 text-red-500 py-2 px-4 mt-8 max-w-md rounded opacity-75">
        <h4 class="font-bold pr-2">Error:</h4>
        <p class="font-semibold">{{ message }}</p>
        <button @click="clearAlert" class="p-2 m-1 transition ease-out duration-700 transform hover:scale-125 focus:outline-none"><img class="w-6 h-3" src="../assets/button_x.png" alt=""></button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'alert',
        props: {
            message: String
        },
        methods: {
            ...mapActions({
                clearAlert: 'alert/clear' 
            })
        }
    }
</script>