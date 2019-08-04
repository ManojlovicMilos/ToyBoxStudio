<template>
    <v-img :src='path' :contain='true' height='calc(100vh - 120px)' />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        file: {
            type: Object,
            required: true
        }
    },
    computed: {
        path() : string {
            return this.file.Path;
        }
    }
});
</script>