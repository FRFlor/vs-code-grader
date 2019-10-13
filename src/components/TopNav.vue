<template>
    <nav class="flex align-center">
        <div class="switch-tabs flex h-100">
            <v-button v-tooltip="tooltipContent('Navigate to previous tab (\'Ctrl + -\')')">
                <vue-svg name="arrowLeft" class="fill-light-blue"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('List tabs')">
                <vue-svg name="caret" class="fill-light-gray"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Navigate to next tab (\'Ctrl + Shift + -\')')">
                <vue-svg name="arrowLeft" class="fill-light-blue vertical-mirror"/>
            </v-button>
        </div>
        <vue-svg name="divisor" class="fill-light-blue"/>
        <div class="file-options flex h-100">
            <v-button v-tooltip="tooltipContent('Begin new evaluation(s) in new tab(s) (\'Ctrl + Shift + N\')')">
                <vue-svg name="newFile" class="fill-light-blue"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Load (\'Ctrl + O\')')"
                      @click="$emit('load-file')"
                      class="fill-folder-yellow"
                      :class="{'disabled': app.isBusy}">
                <vue-svg name="open"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Save (\'Ctrl + S\')')">
                <vue-svg name="save" class="fill-light-blue"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Save As (\'Ctrl + Shift + S\')')"
                      @click="$emit('save-file')">
                <vue-svg name="saveAs" class="fill-light-blue" :class="{'disabled': app.isBusy}"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Print (\'Ctrl + P\')')">
                <vue-svg name="print" class="fill-light-blue"/>
            </v-button>
        </div>
        <vue-svg name="divisor" class="fill-light-blue"/>
        <div class="history flex h-100">
            <v-button v-tooltip="tooltipContent('Undo (\'Ctrl + Z\')')">
                <vue-svg name="back" class="fill-light-blue"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Undo actions')">
                <vue-svg name="caret" class="fill-light-gray"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Redo (\'Ctrl + Y\')')">
                <vue-svg name="back" class="fill-light-blue vertical-mirror"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Redo actions')">
                <vue-svg name="caret" class="fill-light-gray"/>
            </v-button>
        </div>
        <vue-svg name="divisor" class="fill-light-blue"/>
        <div class="run flex h-100">
            <v-button v-tooltip="tooltipContent('Perform automatic scan on all tabs that have not yet been scanned')"
                      class="play-button">
                <div class="flex align-center">
                    <vue-svg name="play" class="fill-light-blue"/>
                    <span style="margin-left: 0.5rem;">Scan all tabs</span>
                </div>
            </v-button>
        </div>
        <vue-svg name="divisor" class="fill-light-blue"/>
    </nav>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import VButton from "@/components/VButton.vue";
    import VueSvg from "@/components/VueSvg.vue";
    import {AppModule} from "@/store/modules/AppModule";


    @Component({
        components: {VueSvg, VButton},
    })
    export default class TopNav extends Vue {
        private app = AppModule;

        private tooltipContent(content: string) {
            return {content, delay: {show: 500, hide: 100}};
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/app";

    nav {
        background-color: $vs_dark_gray;
        display: flex;
        height: 35px;
    }

    .play-button {
        color: $vs_white;
    }

    .disabled {
        fill: $vs_light_gray !important;
    }

</style>
