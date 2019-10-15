<template>
    <div class="flex column">
        <solution-tabs id="app-tabs"/>
        <div class="code-viewer">
            <div class="gutter" id="gutter">
                <div class="single-line-gutter"
                     v-for="lineNumber of 350"
                     @click="onHighlightClicked(lineNumber)"
                     :class="{
                     'orange': isHighlighted(lineNumber),
                     'green': isCommented(lineNumber),
                     }"></div>
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
    import {IComment} from "@/types";

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

        private get currentCommentsInView(): IComment[] {
            return this.$store.getters.currentCommentsInView;
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

        private isHighlighted(lineNumber: number) {
            const {start, end} = this.currentHighlightedLines;
            return start <= lineNumber && end >= lineNumber;
        }

        private isCommented(lineNumber: number) {
            return this.getCommentIndex(lineNumber) !== null;
        }

        private getCommentIndex(lineNumber: number): null | number {
            for (let i = 0; i < this.currentCommentsInView.length; i++) {
                const comment = this.currentCommentsInView[i];
                if (comment.start <= lineNumber && comment.end >= lineNumber) {
                    return i;
                }
            }

            return null;
        }

        private startLineSelected: number = -1;
        private endLineSelected: number = -1;
        private shouldExist: boolean = true;

        public async onHighlightClicked(lineNumber: number) {
            const commentIndex: number | null = this.getCommentIndex(lineNumber);
            if (commentIndex === null) {
                return;
            }
            if (this.$store.state.editingComment) {
                this.$store.commit("saveComment");
            }
            setTimeout(() => this.$store.dispatch("editComment", commentIndex), 250);
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

            &.orange {
                background-color: orange;
            }

            &.green {
                background-color: $vs_green;
            }
        }
    }
</style>
