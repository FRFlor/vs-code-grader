<template>
    <div class="solution-tabs">
        <div v-for="(tab, index) in tabs"
             class="tab"
             @click="$store.commit('switchToTab', index)"
             :class="{'is-current': $store.state.currentTabIndex === index}">
            <div class="flex align-center">
                <div class="circle"
                     :class="{
                     'orange': tab.highlightedLines.start >= 0,
                     'green': tab.comments.length > 0,
                     }"/>
                <span>{{tab.fileName}}</span>
            </div>
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

    .circle {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: $vs_gray;

        &.orange {
            background-color: orange;
        }

        &.green {
            background-color: $vs_green;
        }

        &.orange {
            &.green {
                background: linear-gradient(90deg, orange 0%, orange 50%, green 50%, green 100%);
            }
        }


        margin-right: 0.5rem;
    }

    .tab {
        display: flex;
        margin-right: 0.2rem;
        align-items: center;
        justify-content: flex-start;
        padding: 0.3rem;
        background-color: $vs_gray;
        color: $vs_white;

        width: 6rem;
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
