<template>
    <div id="app" v-show="!isHidden">
        <div>
            <top-nav @load-file="loadVsGradeFile"
                     @save-file="saveVsGradeFile"
                     @load-solutions="loadVsSolutions"
                     id="app-top-nav"/>
        </div>

        <div>
            <div class="mid-one">
                <project-feedback id="app-project-feedback" class="flex-1"/>
                <code-viewer id="app-code-viewer" class="flex-1"/>
            </div>
        </div>

        <bottom-bar/>
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
    import SolutionTabs from "@/components/SolutionTabs.vue";
    import PrepareReport from "@/components/PrepareReport.vue";

    @Component({
        components: {
            PrepareReport,
            SolutionTabs,
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

            ipcRenderer.on("solutions-loaded", (event: IpcRendererEvent, fileLoaded: string) => {
                console.log("here");
                this.$store.commit("changeBusyTo", false);
                this.$store.commit("addFakeTabs");
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

    body, html, #app {
        margin: 0;
        height: 100%;
        overflow: hidden;
        background-color: $vs_black;
        font-size: 18px;
    }

    * {
        font-family: "Source Code Pro", sans-serif;
        font-size: 0.7rem;
    }

    *::placeholder {
        color: $vs_light_gray;
    }

    #app {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .mid-one {
        display: flex;
        justify-content: space-between;
        padding: 0.625rem 1.25rem;

        #app-project-feedback {
            margin-right: 3rem;
        }
    }

</style>
