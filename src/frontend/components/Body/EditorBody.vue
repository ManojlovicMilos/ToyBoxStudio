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
                    <image-editor v-if='editor.Type == "Image"' :image='editor.File.Path' />
                    <code-editor v-if='editor.Type == "Code"' :code='editor.File.Data' :extension='editor.File.Extension' />
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

export default Vue.extend({
    components: {
        'hierarchy' : Hierarchy,
        'code-editor' : Code,
        'image-editor' : Image
    },
    data() {
        return {
            active: 0
        }
    },
    computed: {
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
