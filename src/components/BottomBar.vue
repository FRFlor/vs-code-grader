<template>
    <div class="bottom-bar">

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class BottomBar extends Vue {

    }

</script>

<style lang="scss" scoped>
    @import "../scss/app";

    .bottom-bar {
        height: 20px;
        margin-top: -3px;
        background-color: $vs_dark_gray;
        position: relative;
        z-index: 2;
    }
</style>
