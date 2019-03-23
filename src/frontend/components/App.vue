<template>
    <div class='clean'>
        <v-app v-if='projectExists' class='app' id='project' dark>
            <main-header @sidebar='toggleSidebar' />
            <v-content>
                <v-container class='body-container' fluid fill-height>
                    <main-sidebar v-model='sidebar' />
                    <main-body />
                </v-container>
            </v-content>
            <main-footer />
        </v-app>
        <v-app v-else class='app' id='home' dark>
            <home />
        </v-app>
        <electron />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import Electron from "./ServiceComponents/Electron.vue"
import Header from "./Navigations/Header/Header.vue"
import Footer from "./Navigations/Footer/Footer.vue"
import Sidebar from "./Navigations/Sidebar/Sidebar.vue"
import Body from "./Body/Body.vue"
import Home from "./Home/Home.vue";

export default Vue.extend({
    components: {
        'electron': Electron,
        'main-header': Header,
        'main-footer': Footer,
        'main-sidebar': Sidebar,
        'main-body': Body,
        'home': Home
    },
    data() {
        return {
            sidebar: false
        }
    },
    methods: {
        toggleSidebar() : void {
            this.sidebar = !this.sidebar;
        }
    },
    computed: {
        projectExists() : boolean {
            return !!this.$store.state.projectExists;
        }
    }
});
</script>

<style>
    html {
        overflow: hidden;
    }
    .body-container {
        display: block !important;
        padding: 0px;
    }
    .clean {
        padding: 0px;
        margin: 0px;
    }
</style>
