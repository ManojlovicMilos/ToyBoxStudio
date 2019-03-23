<template>
    <v-layout class='home' row>
        <v-layout class='column' column>
            <span class='title'>ToyBox Studio</span>
            <v-card class='card' :class='{ disabled: disabled }' @click='onNewProject'>
                <v-layout row>
                    <v-icon size="60">create_new_folder</v-icon>
                    <span class='text'>New Project</span>
                </v-layout>
                
            </v-card>
            <v-card class='card' :class='{ disabled: disabled }' @click='onOpenProject'>
                <v-layout row>
                    <v-icon size="60">folder</v-icon>
                    <span class='text'>Open Project</span>
                </v-layout>
            </v-card>
        </v-layout>
        <new-project v-if='newProjectStarted' @disabled='onDisabled' />
    </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { ipcRenderer } from 'electron';
import NewProject from './NewProject/NewProject.vue';

export default Vue.extend({
    components: {
        'new-project': NewProject
    },
    data() {
        return {
            disabled: false,
            newProjectStarted: false
        }
    },
    methods: {
        toggleSidebar() : void {
            this.$emit('sidebar');
        },
        onNewProject() : void {
            if(this.disabled) return;
            this.newProjectStarted = true;
        },
        onOpenProject() : void {
            if(this.disabled) return;
            ipcRenderer.send('to-open-project');
        },
        onDisabled() : void {
            this.disabled = true;
        }
    }
});
</script>

<style scoped>
    .home {
        padding: 50px;
        width: 100%;
        height: 100vh;
        background-color: #111;
    }
    .title {
        font-size: 32px !important;
        margin-bottom: 30px;
    }
    .column {
        max-width: 400px;
    }
    .card {
        margin-top: 20px;
        height: 100px;
        width: 280px;
        padding: 20px;
        cursor: pointer;
        transition: background 0.5s;
        background-color: #222;
    }
    .card:hover {
        background-color: #444;
    }
    .card.disabled {
        color: #888;
        background-color: #555;
    }
    .text {
        padding-top: 15px;
        padding-left: 15px;
        font-size: 20px;
    }
</style>
