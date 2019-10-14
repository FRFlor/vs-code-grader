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
    @Prop({default: 0}) public progress!: number;
}
</script>

<style lang="scss" scoped>
    @import "../scss/app";

    .progress-bar {
        position: relative;
        height: 0.95rem;
        width: 9.5rem;
        border: 1px solid #aaa;
        border-radius: 0.3rem;
        padding: 0.2rem;
    }

    .progress-fill {
        background-color: $vs_blue;
        height: 100%;
        border-radius: 0.125rem;
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
