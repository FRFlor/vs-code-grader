<template>
    <nav class="flex">
        <div class="switch-tabs flex">
            <v-button v-tooltip="tooltipContent('Navigate to previous tab (\'Ctrl + -\')')">
                <vue-svg name="arrowLeft" class="fill-light-blue"/>
            </v-button>
            <v-button>
                <vue-svg name="caret" class="fill-light-gray"/>
            </v-button>
            <v-button>
                <vue-svg name="arrowLeft" class="fill-light-blue vertical-mirror"/>
            </v-button>
        </div>
        <vue-svg name="divisor" class="fill-light-blue"/>
        <div class="file-options flex">
            <v-button>
                <vue-svg name="newFile" class="fill-light-blue"/>
            </v-button>
            <v-button @click="openLoadFileDialog"
                      :class="app.isBusy ? 'fill-light-gray' : 'fill-folder-yellow'"
                      v-tooltip="tooltipContent('Open File (\'Ctrl + O\')')">
                <vue-svg name="open"/>
            </v-button>
            <v-button>
                <vue-svg name="save" class="fill-light-blue"/>
            </v-button>
            <v-button>
                <vue-svg name="saveAs" class="fill-light-blue" @click="openSaveFileDialog"/>
            </v-button>
            <v-button>
                <vue-svg name="print" class="fill-light-blue"/>
            </v-button>
        </div>
        <vue-svg name="divisor" class="fill-light-blue"/>
        <div class="history flex">
            <v-button>
                <vue-svg name="back" class="fill-light-blue"/>
            </v-button>
            <v-button>
                <vue-svg name="caret" class="fill-light-gray"/>
            </v-button>
            <v-button>
                <vue-svg name="back" class="fill-light-blue vertical-mirror"/>
            </v-button>
            <v-button>
                <vue-svg name="caret" class="fill-light-gray"/>
            </v-button>
        </div>
        <vue-svg name="divisor" class="fill-light-blue"/>
        <div class="run flex">
            <v-button class="play-button">
                <div class="flex align-center">
                    <vue-svg name="play" class="fill-light-blue"/>
                    <span style="margin-left: 0.5rem;">Start Automatic Scan</span>
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
    import {ipcRenderer, IpcRendererEvent} from "electron";
    import {AppModule} from "@/store/modules/AppModule";


    @Component({
        components: {VueSvg, VButton},
    })
    export default class TopNav extends Vue {
        private app = AppModule;

        private created() {
            ipcRenderer.on('file-loaded', (event: IpcRendererEvent,  fileLoaded: string) => {
                this.app.changeBusyTo(false);
                alert(`Add new tab for: ${fileLoaded}`);
            });

            ipcRenderer.on('shortcut-open-file', async (event: IpcRendererEvent,  fileLoaded: string) => {
               await this.openLoadFileDialog();
            });
        }

        private async openLoadFileDialog() {
            if (this.app.isBusy) {
                return;
            }
            this.app.changeBusyTo(true);
            ipcRenderer.send('open-file');
        }

        private async openSaveFileDialog() {
            ipcRenderer.send('save-file');
        }

        private tooltipContent(content: string) {
            return {content, delay: {show: 500, hide: 100}}
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

    img {
        fill: red !important;
        stroke: red;
    }
</style>
