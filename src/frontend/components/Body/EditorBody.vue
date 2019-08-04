<template>
    <v-layout class="body" row>
        <hierarchy />
        <v-tabs class="tabs" height='35' max v-model="active" color='#171717' slider-color='orange darken-3'>
            <v-tab grow v-for="editor in editors" :key="editor.File.Path" ripple >
                <span class='tab-title'> {{editor.File.FileName}} </span>
                <v-icon class='tab-close' size='10'>close</v-icon>
            </v-tab>
            <v-tab-item lazy :transition='false' grow v-for="editor in editors" :key="editor.File.Path" >
                <v-container class='body-container' fluid fill-height>
                    <code-editor v-if='editor.Type == "Code"' :file='editor.File' />
                    <image-editor v-if='editor.Type == "Image"' :file='editor.File' />
                    <sound-editor v-if='editor.Type == "Sound"' :file='editor.File' />
                </v-container>
            </v-tab-item>
        </v-tabs>
    </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

import Hierarchy from "./../Editors/Hierarchy/Hierarchy.vue";
import Code from "./../Editors/Code/Code.vue";
import Image from "./../Editors/Image/Image.vue";
import Sound from "./../Editors/Sound/Sound.vue";

export default Vue.extend({
    components: {
        'hierarchy' : Hierarchy,
        'code-editor' : Code,
        'image-editor' : Image,
        'sound-editor' : Sound
    },
    data() {
        return {
        }
    },
    computed: {
        active() : number {
            return this.$store.state.active;
        },
        editors() : any[] {
            return this.$store.state.editors;
        }
    }
});
</script>

<style scoped>
    .body {
        background-color: #0E0E0E;
        width: 100%;
    }
    .tabs {
        width: 100%;
        background-color: #0E0E0E;
    }
    .tab-title {
        font-weight: bold;
        margin-right: 10px;
    }
    .tab-close {
        background-color: #111;
        border-radius: 8px;
        padding: 3px;
    }
</style>
