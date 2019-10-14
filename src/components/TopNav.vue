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
            <v-button v-tooltip="tooltipContent('Begin new evaluation(s) in new tab(s) (\'Ctrl + Shift + N\')')"
                      @click="$emit('load-solutions')">
                <vue-svg name="newFile" class="fill-light-blue"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Load (\'Ctrl + O\')')"
                      @click="$emit('load-file')"
                      class="fill-folder-yellow"
                      :class="{'disabled': isBusy}">
                <vue-svg name="open"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Save (\'Ctrl + S\')')"
                      :disabled="! hasUnsavedChanges"
                      @click="save">
                <vue-svg name="save" class="fill-light-blue" :class="{'disabled': !hasUnsavedChanges}"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Save As (\'Ctrl + Shift + S\')')"
                      @click="saveAs">
                <vue-svg name="saveAs" class="fill-light-blue" :class="{'disabled': isBusy}"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Print (\'Ctrl + P\')')">
                <vue-svg name="print" class="fill-light-blue"/>
            </v-button>
        </div>
        <vue-svg name="divisor" class="fill-light-blue"/>
        <div class="history flex h-100">
            <v-button v-tooltip="tooltipContent('Undo (\'Ctrl + Z\')')"
                      :disabled="!canUndo"
                      @click="undo">
                <vue-svg name="back"
                         class="fill-light-blue"
                         :class="{'disabled': !canUndo}"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Undo actions')">
                <vue-svg name="caret" class="fill-light-gray"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Redo (\'Ctrl + Y\')')"
                      :disabled="!canRedo"
                      @click="redo">
                <vue-svg name="back" class="fill-light-blue vertical-mirror" :class="{'disabled': !canRedo}"/>
            </v-button>
            <v-button v-tooltip="tooltipContent('Redo actions')">
                <vue-svg name="caret" class="fill-light-gray"/>
            </v-button>
        </div>
        <vue-svg name="divisor" class="fill-light-blue"/>
        <div class="run flex h-100">
            <v-button
                    v-tooltip="tooltipContent('Perform automatic scan of the project comments for coverage (\'Ctrl\' + \'Shift\' + \'A\')')"
                    @click="$store.dispatch('analyzeCoverage')"
                    class="play-button">
                <div class="flex align-center">
                    <vue-svg name="play"
                             class="fill-light-blue"/>
                    <span style="margin-left: 0.5rem; width: 6.25rem;"
                          v-text="$store.state.commentAnalysisProgress ? 'Analyzing ...' : 'Analyze comments'"/>
                </div>
            </v-button>
        </div>
        <vue-svg name="divisor" class="fill-light-blue"/>
        <progress-bar style="margin-left: 1rem;" :progress="$store.state.commentAnalysisProgress || 0"
                      v-show="$store.state.commentAnalysisProgress > 0"/>
    </nav>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import VButton from "@/components/VButton.vue";
    import VueSvg from "@/components/VueSvg.vue";
    import ProgressBar from "@/components/ProgressBar.vue";

    @Component({
        components: {VueSvg, VButton, ProgressBar},
    })
    export default class TopNav extends Vue {
        private hasEverBeenSavedBefore: boolean = false;

        private get isBusy(): boolean {
            return this.$store.state.isBusy;
        }

        private tooltipContent(content: string) {
            return {content, delay: {show: 500, hide: 100}};
        }

        private save() {
            if (this.hasEverBeenSavedBefore) {
                this.$store.commit("setHasUnsavedChanges", false);
                return;
            }
            this.hasEverBeenSavedBefore = true;
            this.$emit("save-file");
        }

        private saveAs() {
            this.hasEverBeenSavedBefore = true;
            this.$emit("save-file");
        }

        private get canUndo(): boolean {
            return this.$store.state.canUndo;
        }

        private get canRedo(): boolean {
            return this.$store.state.canRedo;
        }

        private get hasUnsavedChanges(): boolean {
            return this.$store.state.hasUnsavedChanges;
        }

        private async undo(): Promise<void> {
            await this.$store.dispatch("undo");
        }

        private async redo(): Promise<void> {
            await this.$store.dispatch("redo");
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/app";

    nav {
        background-color: $vs_dark_gray;
        display: flex;
        height: 2.2rem;
        position: relative;
        z-index: 5;
    }

    .play-button {
        color: $vs_white;
    }

    .disabled {
        fill: $vs_light_gray !important;
    }

    button {
        &:hover {
            background-color: $vs_gray;
        }
    }
</style>
