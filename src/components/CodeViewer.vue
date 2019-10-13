<template>
    <div class="code-viewer">
        <div class="highlight-wrapper" id="highlights">
            <div class="highlight"
                 v-for="(isCommented, index) in isLineCommented"
                 @click="onHighlightClicked(index)"
                 :class="{'pink': isCommented}"></div>
        </div>
        <div v-highlight class="code-highlight">
            <pre class="language-javascript" @scroll="onscroll">
              <code>
                        {{code}}
              </code>
            </pre>
            <div class="code-highlight-empty-space"></div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class CodeViewer extends Vue {
        private isLineCommented: boolean[] = [];

        created() {
            this.isLineCommented = Array.from({length: 300}, () => false);
        }

        onHighlightClicked(index: number) {
            console.log("clicked on " + index);
            Vue.set(this.isLineCommented, index, !this.isLineCommented[index]);
        }

        private onscroll(e: MouseEvent) {
            const gutter = document.getElementById("highlights") as HTMLDivElement;
            gutter.scrollTop = (e.target as HTMLDivElement).scrollTop;
        }
        private code: string = `
/*
Name: UTCToLocal()

Description: Converts the Greenwich Time to Local Time

Parameters:
- int UTCTime: UTC time in the format HHMM or HMM (only numbers)
- UTCValue: The corresponding UTC timezone, for example, EST has an UTC value of -5.
Returns:
- time in the Local TimeZone

*/
int UTCtoLocal(int UTCtime, int UTCvalue)
{
\tint hour = 0, minute = 0;

\thour = UTCtime / 100;  // Obtain Hours by removing 2 digits from the right
\tminute = UTCtime - hour * 100;  // Obtain Minutes by removing digits from the left
\t
\tif (hour + UTCvalue >= 24)
\t{
\t\thour -= 24;
\t}
\telse if (hour + UTCvalue < 0)
\t{
\t\thour += 24;
\t}
\thour += UTCvalue;
\treturn hour * 100 + minute;
}`;


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
