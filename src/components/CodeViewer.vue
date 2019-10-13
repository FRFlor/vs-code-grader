<template>
    <div class="code-viewer">
        <div class="highlight-wrapper">
            <div class="highlight"
                 v-for="(isCommented, index) in isLineCommented"
                 @click="onHighlightClicked(index)"
                 :class="{'pink': isCommented}"></div>
        </div>
        <vue-code-highlight language="JavaScript" class="code-highlight">
            {{code}}
            {{code}}
        </vue-code-highlight>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {component as VueCodeHighlight} from "vue-code-highlight";

    @Component({components: {VueCodeHighlight}})
    export default class CodeViewer extends Vue {
        private isLineCommented: boolean[] = [];

        created() {
            this.isLineCommented = Array.from({length: 50}, () => false);
        }

        onHighlightClicked(index: number) {
            console.log('clicked on ' + index);
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

    * {
        font-size: 8px !important;
    }

    .code-viewer {
        display: flex;
        overflow-y: auto;
        width: 460px;
    }

    .code-highlight {
        height: 500px;
        width: 450px;
    }

    .highlight-wrapper {
        width: 10px;
        margin-top: 4px;
        .highlight {
            height: 8.5px;
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
