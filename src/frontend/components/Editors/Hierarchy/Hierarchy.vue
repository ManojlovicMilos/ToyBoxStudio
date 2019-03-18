<template>
    <v-layout class="hierarchy scrollable" column>
        <v-treeview class='tree' :items="filteredItems" item-name='Name' item-children='Children' item-key='Path' :open.sync="open">
            <template v-slot:label="{ item }">
                <span @dblclick='openFile(item)' class='label-parent'>
                    <v-icon size='14'>{{findIcon(item)}}</v-icon>
                    <span class="label">{{item.Name}}</span>
                </span>
            </template>
        </v-treeview>
    </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

const FILTERED : string[] = [ '.gitignore', 'LICENSE', 'package.json', 'package-lock.json', 'tsconfig.json', 'webpack.config.js', 'node_modules' ];

export default Vue.extend({
    data() {
        return {
            open: [1, 2],
            search: null,
            caseSensitive: false,
            filtered: FILTERED
        };
    },
    mounted() {
        console.log(this.filtered, this.filteredItems);
    },
    computed: {
        items() : any {
            return this.$store.state.project.tree.Children;
        },
        filteredItems() : any {
            return this.items.filter((item: any) => this.filtered.indexOf(item.Name) == -1 );
        }
    },
    methods: {
        openFile(item: any) {
            console.log(item.Name);
        },
        findIcon(item: any) : string {
            if(item.Type == 'Dir') return 'folder';
            if(item.Extension == 'html') return 'public';
            if(item.Extension == '.ts' || item.Extension == '.js') return 'code';
            if(item.Extension == '' || item.Extension == '.json') return 'settings';
            if(item.Extension == '.png' || item.Extension == '.jpg' || item.Extension == '.jpeg') return 'photo';
            if(item.Extension == '.txt' || item.Extension == '.md' || item.Extension == '.rtf') return 'title';
            if(item.Extension == '.css' || item.Extension == '.scss' || item.Extension == '.sass' || item.Extension == 'less') return 'style';
            return 'insert_drive_file';
        }
    }
});
</script>

<style>
    .hierarchy .v-treeview-node__root {
        max-height: 25px;
    }
    .scrollable {
        overflow-y: auto;
        overflow-x: hidden;
    }
    .scrollable.scrollable-x {
        overflow-x: auto;
    }
    .scrollable::-webkit-scrollbar {
        width: 5px;
        height: 16px;
    }
    .scrollable::-webkit-scrollbar-track {
        background: #222;
    }
    .scrollable::-webkit-scrollbar-thumb {
        background: #444;
    }
</style>

<style scoped>
    .hierarchy {
        background-color: #171719;
        width: 300px;
        padding: 8px;
        height: calc(100vh - 60px);
    }
    .tree {
        
    }
    .label-parent {
        cursor: pointer;
    }
    .label {
        height: 15px;
        font-size: 12px;
    }
</style>
