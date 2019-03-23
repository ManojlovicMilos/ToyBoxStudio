<template>
    <div v-if='false'> </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ipcRenderer } from 'electron';

export default Vue.extend({
    mounted() {
        ipcRenderer.on('from-project-data' , this.eleProjectData.bind(this));
        ipcRenderer.on('from-file-open' , this.eleFileOpen.bind(this));
    },
    methods: {
        eleProjectData(event: any, data: any) : void {
            this.$store.state.project.tree = data;
            this.$store.state.projectExists = true;
            this.$forceUpdate();
        },
        eleFileOpen(event: any, data: any) : void {
            this.$store.state.editors.push({
                Type: 'Code',
                File: data
            });
        }
    }
});
</script>