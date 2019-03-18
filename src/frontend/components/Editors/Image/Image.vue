<template>
    <v-img :src='image' :contain='true' height='calc(100vh - 120px)' />
</template>

<script>
import Vue from "vue";

export default Vue.extend({
    props: {
        image: {
            type: String,
            required: true
        }
    },
    data() {
        return {
           
        };
    },
});
</script>