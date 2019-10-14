<template>
    <div class="flex column">
        <solution-tabs id="app-tabs"/>
        <div class="code-viewer">
            <div class="gutter" id="gutter">
                <div class="single-line-gutter"
                     v-for="(isCommented, index) in currentHighlightedLines"
                     @click="onHighlightClicked(index)"
                     :class="{'pink': isCommented}"></div>
            </div>
            <div v-highlight id="code-box" v-if="shouldExist">
            <pre class="language-javascript"
                 @scroll="onscroll" @mousedown="onMouseDown" @mouseup="onMouseUp">
              <code>
                        {{currentCodeSelected}}
              </code>
            </pre>
            </div>
        </div>
        <comment-writer/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import SolutionTabs from "@/components/SolutionTabs.vue";
    import PrepareReport from "@/components/PrepareReport.vue";
    import CommentWriter from "@/components/CommentWriter.vue";

    @Component({
        components: {CommentWriter, PrepareReport, SolutionTabs}
    })
    export default class CodeViewer extends Vue {

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
            return document.getElementById("gutter") as HTMLDivElement;
        }

        private get topYOfCodeBox(): number {
            return this.codeBox.offsetTop;
        }

        private startLineSelected: number = -1;
        private endLineSelected: number = -1;
        private shouldExist: boolean = true;

        public onHighlightClicked(index: number) {
            console.log("clicked on " + index);
        }

        @Watch("currentCodeSelected")
        private reloadCodeViewer() {
            this.shouldExist = false;
            setTimeout(() => {
                this.shouldExist = true;
            }, 200);
        }

        private onMouseDown(e: MouseEvent) {
            this.startLineSelected = Math.floor((this.gutter.scrollTop + e.clientY - this.topYOfCodeBox) / 9.5);
        }

        private async onMouseUp(e: MouseEvent) {
            this.endLineSelected = Math.floor((this.gutter.scrollTop + e.clientY - this.topYOfCodeBox) / 9.5);
            if (this.startLineSelected === -1 || this.endLineSelected === -1) {
                return;
            }
            const start: number = Math.min(this.startLineSelected, this.endLineSelected);
            const end: number = Math.max(this.startLineSelected, this.endLineSelected);
            this.$store.commit("highlightLines", {start, end});
            await this.$store.dispatch("pointToElement", "write-comment");
        }

        private onscroll(e: MouseEvent) {
            this.gutter.scrollTop = (e.target as HTMLDivElement).scrollTop;
        }
    }
</script>

<style scoped lang="scss">
    @import "~vue-code-highlight/themes/prism-okaidia.css";
    @import "../scss/app";

    $gutter-width: 0.75rem;
    $code-box-width: 100%;
    $code-box-height: 23rem;


    .code-viewer {
        margin-top: -0.25rem;
        display: flex;
        width: 100%;
        height: $code-box-height;
    }

    #code-box {
        display: flex;
        flex-direction: column;
        font-size: 0.625rem;
        width: $code-box-width;

        pre {
            height: $code-box-height;
        }
    }

    .gutter {
        width: $gutter-width;
        margin-top: 0.25rem;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        .single-line-gutter {
            height: 0.5315rem;
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
