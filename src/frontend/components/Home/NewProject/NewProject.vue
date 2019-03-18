<template>
    <v-layout v-if='!created' class='column new-project-panel'>
        <span class='new-project-title'>New Projecto</span>
        <v-card class='new-project-card'>
            <v-text-field color="orange darken-3" v-model="project.name" label="Name" required />
            <v-text-field color="orange darken-3" v-model="project.description" label="Description" required />
            <v-text-field color="orange darken-3" v-model="project.author" label="Author" required />
        </v-card>
        <v-btn class='confirm' color="orange darken-3" @click="onCreate"> Create Project </v-btn>
    </v-layout>
    <v-layout v-else class='column new-project-panel'>
        <span class='new-project-title'>Creating Project Progress</span>
        <loader :complete='initiated' text='Creating New Project' />
        <loader v-if='initiated' :complete='installed' text='Installing Dependencies' />
        <loader v-if='installed' text='Forming Metadata' />
    </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { ipcRenderer } from 'electron';
import Loader from '../Loader/Loader.vue';

export default Vue.extend({
    components: {
        'loader' : Loader  
    },
    data() {
        return {
            created: false,
            initiated: false,
            installed: false,
            project: {
                name: "",
                description: "",
                author: ""
            }
        }
    },
    mounted() {
        ipcRenderer.on('from-create-project-create' , this.eleProjectCreated.bind(this));
        ipcRenderer.on('from-create-project-init' , this.eleProjectInited.bind(this));
        ipcRenderer.on('from-create-project-deps' , this.eleProjectDepsInstalled.bind(this));
    },
    methods: {
        onCreate() : void {
            this.$emit('disabled');
            if(this.project.name.length == 0) return;
            if(this.project.description.length == 0) this.project.description = this.project.name;
            if(this.project.author.length == 0) this.project.author = 'Unknown';
            ipcRenderer.send('to-create-project', this.project);
        },
        eleProjectCreated() : void {
            this.created = true;
        },
        eleProjectInited() : void {
            this.initiated = true;
        },
        eleProjectDepsInstalled() : void {
            this.installed = true;
        }
    }
});
</script>

<style scoped>
    .new-project-title {
        font-size: 18px;
    }
    .new-project-panel {
        padding-top: 40px;
    }
    .new-project-card {
        background-color: #222;
        margin-top: 10px;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .confirm {
        margin-top: 20px;
        width: 95%;
    }
</style>
