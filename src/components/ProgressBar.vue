<template>
    <div class="progress-bar">
        <div class="progress-fill" :style="`width: ${progress}%`">
        </div>
        <span class="progress-number">{{ progress }}%</span>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class ProgressBar extends Vue {
        @Prop({default: 0}) progress!: number;
    }
</script>

<style lang="scss" scoped>
    @import "../scss/app";

    .progress-bar {
        position: relative;
        height: 15px;
        width: 150px;
        border: 1px solid #aaa;
        border-radius: 5px;
        padding: 3px;
    }

    .progress-fill {
        background-color: $vs_blue;
        height: 100%;
        border-radius: 2px;
    }

    .progress-number {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        color: $vs_white;
    }
</style>
