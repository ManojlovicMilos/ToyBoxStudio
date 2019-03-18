<template>
    <v-navigation-drawer :width='sidebarWidth' class='sidebar' v-model="visible" clipped fixed app>
        <v-list dense>
            <sidebar-option :text-visible='textVisible' text='Editors' icon='color_lens' />
            <sidebar-option :text-visible='textVisible' text='Search' icon='search' />
            <sidebar-option :text-visible='textVisible' text='Extensions' icon='extensions' />
            <sidebar-option :text-visible='textVisible' text='Settings' icon='settings' />
            <sidebar-option :text-visible='textVisible' text='Help' icon='help' />
            <sidebar-option :text-visible='textVisible' text='Exit Project' icon='exit_to_app' @click='onExit' class='exit' />
            <sidebar-option :text-visible='textVisible' text='Hide Text' :icon='textVisibleIcon' @click='onToggleTextVisibility' />
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";

import SidebarOption from './SidebarOption.vue';

export default Vue.extend({
    components: {
        'sidebar-option': SidebarOption
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() : any {
        return {
            textVisible: true
        }
    },
    computed: {
        visible: {
            get() : boolean {
                return this.value;
            },
            set(value: boolean) : void {
                this.$emit('input', this.value);
            }
        },
        sidebarWidth() {
            return this.textVisible ? 200 : 75;
        },
        textVisibleIcon() {
            return this.textVisible ? 'visibility_off' : 'visibility';
        }
    },
    methods: {
        onToggleTextVisibility() : void {
            this.textVisible = !this.textVisible;
        },
        onExit() : void {
            this.$store.state.projectExists = false;
        }
    }
});
</script>

<style scoped>
    .sidebar {
        background-color: #111;
        overflow: hidden;
        border-color: #151515;
    }
    .exit {
        margin-top: calc(100vh - 440px);
    }
</style>
