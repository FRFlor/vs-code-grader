<template>
    <div id="app">
        <top-nav/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TopNav from "./components/TopNav.vue";

    @Component({
        components: {
            TopNav,
        },
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss">
    html, body {
        margin: 0;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
    }

    #app {

    }
</style>
