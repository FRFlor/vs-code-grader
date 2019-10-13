<template>
    <input type="text"
           :placeholder="placeholder"
           :value="value"
           @input="event => $emit('input', event.target.value)"
           @focus="$emit('focus')">
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class InputBox extends Vue {
        @Prop({default: "I am the placeholder"}) private placeholder!: string;
        @Prop({default: ""}) private value!: string;
    }
</script>

<style lang="scss" scoped>
    input {

    }
</style>
