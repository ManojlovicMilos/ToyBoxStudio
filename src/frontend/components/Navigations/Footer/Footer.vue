<template>
    <v-footer class='footer' color='#1C1C1C' height='20' app fixed>
        <p class='version'>ToyBox Studio {{ this.$store.state.version }}</p>
    </v-footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({ });
</script>

<style scoped>
    .footer {
        max-height: 20px;
    }
    .version {
        margin: 0px;
        position: absolute;
        top: 2px;
        right: 10px;
        font-size: 10px;
    }
</style>
