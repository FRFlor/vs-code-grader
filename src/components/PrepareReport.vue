<template>
    <div class="flex justify-between prepare-report">
        <div class="action-buttons-wrapper">
            <h2>Prepare Report:</h2>
            <v-button class="blue-button" @click="previewDocument">
                <vue-svg name="preview"/>
                <span>Preview Document</span>
            </v-button>
            <v-button class="blue-button" @click="exportDocument">
                <vue-svg name="export"/>
                <span>Export</span>
            </v-button>
            <v-button class="blue-button" @click="printDocument">
                <vue-svg name="print"/>
                <span>Print</span>
            </v-button>
        </div>
        <div class="warning-display">
            <h2 v-show="hasSomeWarnings">Warnings:</h2>
            <div class="warning-buttons-container">
                <div v-for="(warning, index) in warnings"
                     v-show="warning.condition()"
                     :key="index">
                    <v-button class="warning-button"
                              @click="$store.dispatch('pointToElement', warning.id)">
                        <span v-text="warning.description"/>
                        <vue-svg name="warning"/>
                    </v-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import VButton from "@/components/VButton.vue";
    import VueSvg from "@/components/VueSvg.vue";
    import {loseFocus} from "@/support";

    @Component({
        components: {VueSvg, VButton}
    })
    export default class PrepareReport extends Vue {
        private warnings = [
            {
                condition: () => !this.$store.state.coveragePercent,
                id: "analyze-comments-bottom",
                description: "Have not run the comment scan"
            },
            {
                condition: () => !this.$store.state.projectName,
                id: "project-name",
                description: "Missing project name"
            },
            {
                condition: () => this.$store.state.students.length === 0,
                id: "new-student",
                description: "Missing student information"
            },
            {
                condition: () => this.$store.state.loadsState === 0,
                id: "loads-check",
                description: "Missing evaluation for \"Loads\""
            },
            {
                condition: () => this.$store.state.compilesState === 0,
                id: "compiles-check",
                description: "Missing evaluation for \"Compiles\""
            },
            {
                condition: () => this.$store.state.runsState === 0,
                id: "runs-check",
                description: "Missing evaluation for \"Runs\""
            },
        ];

        private get hasSomeWarnings() {
            for (let i = 0; i < this.warnings.length; i++) {
                const warning = this.warnings[i];
                if (warning.condition()) {
                    return true;
                }
            }
            return false;
        }

        private previewDocument() {
            this.$nextTick(loseFocus);
        }

        private exportDocument() {
            this.$nextTick(loseFocus);
        }

        private printDocument() {
            this.$nextTick(loseFocus);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/app";

    h2 {
        color: $vs_white;
        font-weight: normal;
        font-size: 0.8rem;
    }

    .prepare-report {
        margin-top: 0.5rem;
    }

    .action-buttons-wrapper {
        display: flex;
        flex-direction: column;
    }

    .warning-buttons-container {
        max-height: 7rem;
        overflow-y: auto;
    }

    .warning-button {
        background-color: $gray;
        color: $vs_white;
        width: 18rem;
        padding: 0.3rem 1rem 0.3rem 0.5rem;
        border-radius: 0.3rem;
        margin-bottom: 0.3rem;

        &:hover {
            cursor: pointer;
        }

        span {
            flex: 1;
            text-align: start;
        }
    }

    .blue-button {
        background-color: $lighter_blue;
        border: 2px solid $vs_dark_blue;
        padding: 0.5rem;
        width: 12rem;
        margin-bottom: 0.3rem;
        fill: $vs_dark_blue;

        span {
            font-size: 0.8125rem;
        }

        &:hover {
            cursor: pointer;
        }

        span {
            margin-left: 0.5rem;
        }
    }
</style>
