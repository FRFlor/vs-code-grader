<template>
    <div id="app">
        <top-nav @load-file="openLoadFileDialog"
                 @save-file="openSaveFileDialog"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TopNav from "./components/TopNav.vue";
    import {ipcRenderer, IpcRendererEvent} from "electron";
    import {AppModule} from "@/store/modules/AppModule";

    @Component({
        components: {
            TopNav,
        },
    })
    export default class App extends Vue {
        private app = AppModule;

        private created() {
            ipcRenderer.on("file-loaded", (event: IpcRendererEvent, fileLoaded: string) => {
                this.app.changeBusyTo(false);
                alert(`Add new tab for: ${fileLoaded}`);
            });
            ipcRenderer.on("file-saved", () => {
                this.app.changeBusyTo(false);
            });

            ipcRenderer.on("shortcut-open-file", () => {
                this.openLoadFileDialog();
            });
        }

        private checkForBusy(): boolean {
            if (this.app.isBusy) {
                return false;
            }
            this.app.changeBusyTo(true);

            return true;
        }

        private openLoadFileDialog() {
            if (!this.checkForBusy()) {
                return;
            }

            ipcRenderer.send("open-file");
        }

        private openSaveFileDialog() {
            if (!this.checkForBusy()) {
                return;
            }

            ipcRenderer.send("save-file");
        }
    }
</script>

<style lang="scss">
    @import "./scss/app";
    @import "./scss/tooltip";

    html, body {
        margin: 0;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
    }

    #app {

    }
</style>
