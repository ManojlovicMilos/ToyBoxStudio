<template>
    <v-toolbar class='header' height='50' app fixed clipped-left>
        <v-toolbar-side-icon class='sidebar-toggler' @click.stop="toggleSidebar"></v-toolbar-side-icon>
        <v-toolbar-title>ToyBox Studio</v-toolbar-title>
    </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    methods: {
        toggleSidebar() : void {
            this.$emit('sidebar');
        }
    }
});
</script>

<style scoped>
</style>
