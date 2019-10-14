<template>
    <div class="solution-tabs">
        <div v-for="(tab, index) in tabs"
             class="tab"
             @click="$store.commit('switchToTab', index)"
             :class="{'is-current': $store.state.currentTabIndex === index}">
            {{tab.fileName}}
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {ITab} from "../types/store";

    @Component
    export default class SolutionTabs extends Vue {
        private get tabs(): ITab[] {
            return this.$store.state.tabs as ITab[];
        }
    }
</script>


<style lang="scss" scoped>
    @import "../scss/app";

    .solution-tabs {
        display: flex;
    }

    .tab {
        display: flex;
        margin-right: 0.2rem;
        align-items: center;
        justify-content: flex-start;
        padding: 0.3rem;
        background-color: $vs_gray;
        color: $vs_white;
        width: 5.5rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        &:hover, &.is-current:hover {
            cursor: pointer;
            background-color: $vs_light_blue;
        }

        &.is-current {
            background-color: $vs_blue;
        }
    }
</style>
