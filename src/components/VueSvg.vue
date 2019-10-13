<template>
    <div v-html="svg"/>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({
    })
    export default class VueSvg extends Vue {
        @Prop() private name!: string;

        private get svg(): string {
            return window.svgs[this.name];
        }
    }
</script>
