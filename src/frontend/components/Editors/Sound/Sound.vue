<template>
    <v-card class='card'>
        <v-layout column class='panel'>
            <v-label color='white' class='label'>{{name}}</v-label>
            <v-layout row class='options'>
                <v-icon size='40' @click='play'>play_arrow</v-icon>
                <v-icon class='icon' size='30'>stop</v-icon>
                <v-icon class='icon' size='30'>volume_up</v-icon>
            </v-layout>
        </v-layout>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import * as TBX from 'engineer-js';

export default Vue.extend({
    props: {
        file: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            sound: new TBX.SoundObject('')
        };
    },
    mounted() {
        this.sound = new TBX.SoundObject(this.file.Path);
        this.sound.Volume = this.$store.state.settings.volume;
    },
    computed: {
        name() : string {
            return this.file.Name;
        },
        path() : string {
            return this.file.Path;
        }
    },
    methods: {
        play() : void {
            this.sound.Play();
        }
    }
});
</script>

<style scoped>
    .card {
        margin: 10px;
        padding: 10px;
        width: 250px;
        color: white !important;
        background-color: #222;
    }
    .label {
        font-size: 20px;
        color: white;
    }
    .options {
        padding:8px;
    }
    .icon {
        cursor: pointer;
        margin-left: 10px;
        margin-top: 10px;
    }
</style>
