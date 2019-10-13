<template>
    <nav class="flex">
        <div class="switch-tabs flex">
            <v-button>
                <img src="../assets/arrowLeft.svg" alt="go to previous tab">
            </v-button>
            <v-button>
                <img src="../assets/caret.svg" alt="see open tabs">
            </v-button>
            <v-button>
                <img src="../assets/arrowLeft.svg" style="transform: scaleX(-1);" alt="go to next tab">
            </v-button>
        </div>
        <img src="../assets/divisor.svg" alt="divisor">
        <div class="file-options flex">
            <v-button>
                <img src="../assets/newFile.svg" alt="create new file">
            </v-button>
            <v-button>
                <img src="../assets/caret.svg" alt="new report">
            </v-button>
            <v-button>
                <img src="../assets/save.svg" alt="save">
            </v-button>
            <v-button>
                <img src="../assets/saveAs.svg" alt="save as">
            </v-button>
        </div>
        <img src="../assets/divisor.svg" alt="divisor">
        <div class="history flex">
            <v-button>
                <img src="../assets/back.svg" alt="previous">
            </v-button>
            <v-button>
                <img src="../assets/caret.svg" alt="see previous options">
            </v-button>
            <v-button>
                <img src="../assets/back.svg" style="transform: scaleX(-1);" alt="next">
            </v-button>
            <v-button>
                <img src="../assets/caret.svg" alt="see next options">
            </v-button>
        </div>
        <img src="../assets/divisor.svg" alt="divisor">
    </nav>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import VButton from "@/components/VButton.vue";

    @Component({
        components: {VButton},
    })
    export default class TopNav extends Vue {
    }
</script>

<style lang="scss" scoped>
    @import "../app";

    nav {
        background-color: $vs_dark_gray;
        display: flex;
        height: 35px;
    }

    img {
        pointer-events: none;
    }

</style>
