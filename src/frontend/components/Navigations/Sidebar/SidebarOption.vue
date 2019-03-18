<template>
    <v-list-tile class='option' @click="onClick">
        <v-list-tile-action>
            <v-icon size='30'>{{icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content v-if='textVisible'>
            <v-list-tile-title>{{text}}</v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        icon: {
            type: String,
            default: 'block'
        },
        text: {
            type: String,
            default: 'Option'
        },
        textVisible: {
            type: Boolean,
            default: true
        },
    },
    methods: {
        onClick() : void {
            this.$emit('click');
        }
    }
});
</script>

<style>
    .option .v-list__tile--link:hover {
        background: #222 !important;
    }
</style>

<style scoped>
    .option {
        font-size: 32px;
        padding-left: 5px;
        margin-top: 10px;
        transition: background 0s;
    }
    .option:hover {
        background-color: #EF6C00;
    }
</style>
