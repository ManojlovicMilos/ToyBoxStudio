<template>
    <v-layout class="body" row>
        <hierarchy />
        <v-tabs class="tabs" height='35' max v-model="active" slider-color="yellow">
            <v-tab grow v-for="n in 3" :key="n" ripple >
                <span class='tab-title'> Item - {{n}} </span>
                <v-icon class='tab-close' size='10'>close</v-icon>
            </v-tab>
            <v-tab-item lazy :transition='false' v-for="n in 3" :key="n" >
                <v-container class='body-container' fluid fill-height>
                    <v-card flat>
                        <v-card-text>Card {{n}}</v-card-text>
                    </v-card>
                </v-container>
            </v-tab-item>
        </v-tabs>
    </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

import Hierarchy from "./../Editors/Hierarchy/Hierarchy";

export default Vue.extend({
    components: {
        hierarchy: Hierarchy
    },
    data() {
        return {
            active: 0
        }
    }
});
</script>

<style scoped>
    .body {
        width: 100%;
    }
    .tabs {
        width: 100%;
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
