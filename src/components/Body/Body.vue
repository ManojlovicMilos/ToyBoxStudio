<template>
    <editor-body class='editor-body' fill-height />
</template>

<script lang="ts">
import Vue from "vue";

import EditorBody from './EditorBody.vue';

export default Vue.extend({
    components: {
        'editor-body': EditorBody
    }
});
</script>

<style scoped>
    
</style>
