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
        height: 1.25rem;
        background-color: $vs_dark_gray;
    }
</style>
