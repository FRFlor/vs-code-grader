<template>
    <div id="app" v-show="!isHidden">
        <top-nav @load-file="openLoadFileDialog"
                 @save-file="openSaveFileDialog"
                 id="app-top-nav"/>
        <div id="app-tabs"></div>
        <project-feedback id="app-project-feedback"/>
        <code-viewer id="app-code-viewer"/>
        <bottom-bar id="app-bottom-bar"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TopNav from "./components/TopNav.vue";
    import {ipcRenderer, IpcRendererEvent} from "electron";
    import MouseTrap from "mousetrap";
    import CodeViewer from "@/components/CodeViewer.vue";
    import BottomBar from "@/components/BottomBar.vue";
    import ProjectFeedback from "@/components/ProjectFeedback.vue";

    @Component({
        components: {
            ProjectFeedback,
            BottomBar,
            CodeViewer,
            TopNav,
        },
    })
    export default class App extends Vue {
        private isHidden: boolean = true;

        private created() {
            ipcRenderer.on("zoom-removed", () => this.isHidden = false);

            ipcRenderer.on("file-loaded", (event: IpcRendererEvent, fileLoaded: string) => {
                this.$store.commit('changeBusyTo', false);
                alert(`Add new tab for: ${fileLoaded}`);
            });
            ipcRenderer.on("file-saved", () => {
                this.$store.commit('changeBusyTo', false);
            });

            MouseTrap.bind(["command+o", "ctrl+o"], () => this.openLoadFileDialog());
            MouseTrap.bind(["command+z", "ctrl+z"], async () => await this.$store.dispatch('undo'));
            MouseTrap.bind(["command+y", "ctrl+y"], async () => await this.$store.dispatch('redo'));
        }

        private checkForBusy(): boolean {
            if (this.$store.state.isBusy) {
                return false;
            }
            this.$store.commit('changeBusyTo', true);

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
        background: $vs_black;
    }

    #app {
        display: grid;
        grid-template-areas:
                "topnav  topnav  topnav  topnav  topnav topnav"
                "proj    proj    tabs    tabs    tabs   tabs"
                "proj    proj    codc    codc    codc   codc"
                "botbar  botbar  botbar  botbar  botbar botbar";
    }

    #app-top-nav {
        grid-area: topnav;
    }

    #app-tabs {
        grid-area: tabs;
        height: 20px;
        background-color: red;
    }

    #app-project-feedback {
        grid-area: proj;
    }

    #app-code-viewer {
        grid-area: codc;
    }

    #app-bottom-bar {
        grid-area: botbar;
    }
</style>
