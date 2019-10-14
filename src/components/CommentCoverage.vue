<template>
    <div class="comment-coverage" :class="colorClass">
        <h2>Comment Coverage</h2>
        <div class="value"
             v-text="$store.state.coveragePercent === null ? ' - - ' : $store.state.coveragePercent + '%'"/>
    </div>
</template>


<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class CommentCoverage extends Vue {

        private get colorClass(): string {
            const coverage = this.$store.state.coveragePercent;
            if (coverage === null) {
                return "";
            }

            if (coverage < 50) {
                return "red";
            }

            if (coverage < 80) {
                return "orange";
            }

            return "green";
        }

    }
</script>

<style lang="scss" scoped>
    @import "../scss/app";

    .comment-coverage {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: $vs_gray;
        color: $vs_black;
        border: 2px solid $vs_light_gray;
        width: 11rem;
        padding: 0.95rem 0.3125rem;

        &.red {
            background-color: #ffd1ca;
            color: #ff374a;
            border-color: #ff374a;
        }

        &.orange {
            background-color: #ffe4cd;
            color: #e48645;
            border-color: #e48645;
        }

        &.green {
            background-color: #d8ffec;
            color: #46bd4d;
            border-color: #46bd4d;
        }

        h2 {
            font-size: 1rem;
            font-weight: bold;
            margin: 0 0 1.25rem;
        }

        .value {
            font-size: 1.125rem;
            font-weight: bold;
        }
    }
</style>
