<template>
    <div ref='container' class='full'>
        <monaco :style='style' class="editor" v-model="code" :theme='"hc-black"' :language="fileType" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import monaco from 'vue-monaco';

export default Vue.extend({
    components: {
        'monaco' : monaco
    },
    props: {
        code: {
            type: String,
            required: true
        },
        extension: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions.bind(this));
    },
    data() {
        return {
            style: { width: 300, height: 200 }
        };
    },
    computed: {
        fileType() : string {
            if(this.extension == '.html') return 'html';
            if(this.extension == '.js') return 'javascript';
            if(this.extension == '.ts') return 'typescript';
            if(this.extension == '.css' || this.extension == '.sass' || this.extension == '.less' || this.extension == '.scss') return 'css';
            return '';
        }
    },
    methods: {
        updateDimensions() : void {
            this.style = {
                width: this.$refs.container.clientWidth,
                height: this.$refs.container.clientHeight
            };
            console.log(this.$refs.container);
        }
    }
});
</script>

<style>
    .full {

    }
    .editore {
        width: 100%;
        height: calc(100vh - 120px);
    }
</style>