<template>
    <div class="flex justify-between">
        <div class="prepare-report">
            <h2>Prepare Report:</h2>
            <v-button class="blue-button" @click="previewDocument">
                <vue-svg name="play"/>
                <span>Preview Document</span>
            </v-button>
            <v-button class="blue-button" @click="exportDocument">
                <vue-svg name="play"/>
                <span>Export</span>
            </v-button>
            <v-button class="blue-button" @click="printDocument">
                <vue-svg name="play"/>
                <span>Print</span>
            </v-button>
        </div>
        <div class="warning-display">

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
        display: flex;
        flex-direction: column;
    }

    .blue-button {
        background-color: $lighter_blue;
        border: 2px solid $vs_dark_blue;
        padding: 0.5rem;
        width: 12rem;
        margin-bottom: 0.3rem;

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
