<template>
    <v-card class='card'>
        <span class='text' :class=' { complete:complete } '>{{ text }}</span>
        <v-progress-circular class='loader' v-if='!complete' indeterminate color="orange darken-3" ></v-progress-circular>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        text: {
            type: String,
            default: 'Loading'
        },
        complete: {
            type: Boolean,
            default: false
        }
    }
});
</script>

<style scoped>
    .text {
        color: white;
        font-size: 15px;
    }
    .text.complete {
        color: #AAA;
    }
    .card {
        height: 45px;
        background-color: #222;
        margin-top: 10px;
        padding: 10px;
        padding-left: 16px;
        padding-right: 16px;
    }
    .loader {
        position: absolute;
        top: 5px;
        right: 5px;
    }
</style>