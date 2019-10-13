<template>
    <div class="code-viewer">
        <div class="highlight-wrapper" id="highlights">
            <div class="highlight"
                 v-for="(isCommented, index) in tabs.currentHighlightedLines"
                 @click="onHighlightClicked(index)"
                 :class="{'pink': isCommented}"></div>
        </div>
        <div v-highlight class="code-highlight">
            <pre class="language-javascript" @scroll="onscroll">
              <code>
                        {{tabs.currentCodeSelected}}
              </code>
            </pre>
            <div class="code-highlight-empty-space"></div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {TabsModule} from "@/store/modules/TabsModule";

    @Component
    export default class CodeViewer extends Vue {
        private tabs = TabsModule;

        onHighlightClicked(index: number) {
            console.log("clicked on " + index);
            this.tabs.highlightLines(index);
        }

        private onscroll(e: MouseEvent) {
            const gutter = document.getElementById("highlights") as HTMLDivElement;
            gutter.scrollTop = (e.target as HTMLDivElement).scrollTop;
        }
    }

</script>

<style scoped lang="scss">
    @import "~vue-code-highlight/themes/prism-okaidia.css";
    @import "../scss/app";

    .code-viewer {
        margin-top: -4px;
        display: flex;
        width: 460px;
        height: calc(100vh - 45px);
    }

    .code-highlight-empty-space {
        display: flex;
        flex: 1;
        background-color: #272822;
        margin-top: -5px;
    }

    .code-highlight {
        display: flex;
        flex-direction: column;
        font-size: 8px;
    }

    .highlight-wrapper {
        width: 10px;
        margin-top: 4px;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        .highlight {
            height: 8.5px;
            background-color: $vs_dark_gray;

            &:hover {
                cursor: pointer;
            }

            &.pink {
                background-color: pink;
            }
        }
    }


    .comment {
        color: forestgreen;
    }

    .tab {
        padding-left: 10px;
    }

    .tab-2 {
        padding-left: 20px;
    }
</style>
