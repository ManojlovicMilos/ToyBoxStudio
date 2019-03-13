<template>
    <v-app class='app' id='inspire' dark>
        <main-header @sidebar='toggleSidebar' />
        <v-content>
            <v-container class='body-container' fluid fill-height>
                <main-sidebar v-model='sidebar' />
                <main-body />
            </v-container>
        </v-content>
        <main-footer />
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import Header from "./Navigations/Header/Header.vue"
import Footer from "./Navigations/Footer/Footer.vue"
import Sidebar from "./Navigations/Sidebar/Sidebar.vue"
import Body from "./Body/Body.vue"

export default Vue.extend({
    components: {
        'main-header': Header,
        'main-footer': Footer,
        'main-sidebar': Sidebar,
        'main-body': Body
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
</style>
