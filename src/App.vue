<template>
    <div id="app" v-show="!isHidden">
        <top-nav @load-file="loadVsGradeFile"
                 @save-file="saveVsGradeFile"
                 @load-solutions="loadVsSolutions"
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
                this.$store.commit("changeBusyTo", false);
            });

            ipcRenderer.on("file-saved", () => {
                this.$store.commit("changeBusyTo", false);
                this.$store.commit("setHasUnsavedChanges", false);
            });

            MouseTrap.bind(["command+o", "ctrl+o"], () => this.loadVsGradeFile());
            MouseTrap.bind(["command+z", "ctrl+z"], async () => await this.$store.dispatch("undo"));
            MouseTrap.bind(["command+y", "ctrl+y"], async () => await this.$store.dispatch("redo"));
            MouseTrap.bind(["command+shift+a", "ctrl+shift+a"], async () => await this.$store.dispatch("analyzeCoverage"));
            MouseTrap.bind(["command+shift+n", "ctrl+shift+n"], () => this.loadVsSolutions());
        }

        private checkForBusy(): boolean {
            if (this.$store.state.isBusy) {
                return false;
            }
            this.$store.commit("changeBusyTo", true);

            return true;
        }

        private loadVsGradeFile() {
            if (!this.checkForBusy()) {
                return;
            }

            ipcRenderer.send("open-vsgrade-file");
        }

        private loadVsSolutions() {
            if (!this.checkForBusy()) {
                return;
            }

            ipcRenderer.send("open-solution-file");
        }

        private saveVsGradeFile() {
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

    * {
        font-family: "Source Code Pro", sans-serif;
        font-size: 11px;
    }

    *::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: $vs_light_gray;
    }

    #app {
        display: grid;
        // @formatter:off
        grid-template-areas:
                "topnav    topnav  topnav  topnav topnav  topnav  topnav topnav topnav"
                "proj    tabs    tabs    tabs   tabs  tabs  tabs tabs tabs"
                "proj    codc    codc    codc   codc  codc  codc codc codc"
                "botbar  botbar  botbar  botbar botbar  botbar  botbar botbar botbar";
        // @formatter:on
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
