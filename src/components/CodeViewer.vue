<template>
    <div class="code-viewer">
        <div class="highlight-wrapper" id="highlights">
            <div class="highlight"
                 v-for="(isCommented, index) in currentHighlightedLines"
                 @click="onHighlightClicked(index)"
                 :class="{'pink': isCommented}"></div>
        </div>
        <div v-highlight id="code-box">
            <pre class="language-javascript"
                 @scroll="onscroll" @mousedown="onMouseDown" @mouseup="onMouseUp">
              <code>
                        {{currentCodeSelected}}
              </code>
            </pre>
        </div>
    </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class CodeViewer extends Vue {
    private startLineSelected: number = -1;
    private endLineSelected: number = -1;

    private get currentCodeSelected() {
        return this.$store.getters.currentCodeSelected;
    }

    private get currentHighlightedLines() {
        return this.$store.getters.currentHighlightedLines;
    }

    private get codeBox(): HTMLDivElement {
        return document.getElementById("code-box") as HTMLDivElement;
    }

    private get gutter(): HTMLDivElement {
        return document.getElementById("highlights") as HTMLDivElement;
    }

    private get topYOfCodeBox(): number {
        return  this.codeBox.offsetTop;
    }

    public onHighlightClicked(index: number) {
        console.log("clicked on " + index);
    }

    private onMouseDown(e: MouseEvent) {
        this.startLineSelected = Math.floor((this.gutter.scrollTop + e.clientY - this.topYOfCodeBox) / 8.5);
    }

    private onMouseUp(e: MouseEvent) {
        this.endLineSelected = Math.floor((this.gutter.scrollTop + e.clientY - this.topYOfCodeBox) / 8.5);
        if (this.startLineSelected === -1 || this.endLineSelected === -1) {
            return;
        }
        const start: number = Math.min(this.startLineSelected, this.endLineSelected);
        const end: number = Math.max(this.startLineSelected, this.endLineSelected);
        this.$store.commit('highlightLines', {start, end});
    }

    private onscroll(e: MouseEvent) {
        this.gutter.scrollTop = (e.target as HTMLDivElement).scrollTop;
    }
}
</script>

<style scoped lang="scss">
    @import "~vue-code-highlight/themes/prism-okaidia.css";
    @import "../scss/app";
    $gutter-width: 12px;
    $code-box-width: 450px;
    $code-box-height: calc(100vh - 67px);


    .code-viewer {
        margin-top: -4px;
        display: flex;
        width: $gutter-width + $code-box-width;
        height: $code-box-height;
    }

    #code-box {
        display: flex;
        flex-direction: column;
        font-size: 10px;
        width: $code-box-width;
        pre {
            height: $code-box-height;
        }
    }

    .highlight-wrapper {
        width: $gutter-width;
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
</style>
