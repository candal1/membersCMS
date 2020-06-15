<template>
    <div class=" absolute inline-flex items-center border-2 border-red-300 bg-red-100 text-red-500 py-2 px-4 mt-20 max-w-md rounded opacity-75">
        <h4 class="font-bold pr-2">Error:</h4>
        <p class="font-semibold">{{ message }}</p>
        <button @click="clear" class="p-2 m-1 transition ease-out duration-200 transform hover:scale-125 focus:outline-none rounded-full hover:opacity-100"><img class="w-8 h-auto rounded-full" src="../assets/button_x.png" alt=""></button>
    </div>
</template>

<script>
    export default {
        name: 'AlertItem',
        props: {
            message: String
        },
        methods: {
            clear () {
                this.$emit('clear');
            }
        }
    }
</script>