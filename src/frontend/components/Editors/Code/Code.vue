<template>
    <div ref='container' class='full'>
        <v-textarea
            class='scrollable'
            :name='name'
            :value='code'
            :hint='name'
            full-width
            color='orange darken-3'
            :height='"calc(100vh - 120px)"'
        ></v-textarea>
    </div>
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
        name() : string {
            return this.file.Name;
        },
        code() : string {
            return this.file.Data;
        },
        extension() : string {
            return this.file.Extension;
        }
    }
});
</script>

<style scoped>
    .editor {
        padding: 10px;
    }
</style>