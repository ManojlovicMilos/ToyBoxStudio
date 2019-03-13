<template>
    <v-layout class="hierarchy" column>
        <v-treeview class='tree' :items="items" :open.sync="open">
            <template v-slot:label="{ item }">
                <span class="label">{{item.name}}</span>
            </template>
            <template v-slot:prepend="{ item }">
                <v-icon v-if="item.children" v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`">
                </v-icon>
            </template>
        </v-treeview>
    </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            items: [
                {
                    id: 1,
                    name: 'Vuetify',
                    children: [
                        {
                            id: 2,
                            name: 'Core team',
                            children: [
                                {
                                    id: 201,
                                    name: 'John'
                                },
                                {
                                    id: 202,
                                    name: 'Kael'
                                },
                                {
                                    id: 203,
                                    name: 'Nekosaur'
                                },
                                {
                                    id: 204,
                                    name: 'Jacek'
                                },
                                {
                                    id: 205,
                                    name: 'Andrew'
                                }
                            ]
                        },
                        {
                            id: 3,
                            name: 'Administrators',
                            children: [
                                {
                                    id: 301,
                                    name: 'Ranee'
                                },
                                {
                                    id: 302,
                                    name: 'Rachel'
                                }
                            ]
                        },
                        {
                            id: 4,
                            name: 'Contributors',
                            children: [
                                {
                                    id: 401,
                                    name: 'Phlow'
                                },
                                {
                                    id: 402,
                                    name: 'Brandon'
                                },
                                {
                                    id: 403,
                                    name: 'Sean'
                                }
                            ]
                        }
                    ]
                }
            ],
            open: [1, 2],
            search: null,
            caseSensitive: false 
        };
    }
});
</script>

<style scoped>
    .hierarchy {
        background-color: #111;
        width: 350px;
        padding: 8px;
        height: calc(100vh - 60px);
    }
    .tree {
        
    }
    .label {
        font-size: 12px;
    }
</style>
