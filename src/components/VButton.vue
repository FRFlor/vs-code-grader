<template>
    <button @click="onClick" :disabled="disabled">
        <div class="no-click flex">
            <slot>
                x
            </slot>
        </div>
    </button>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";


    @Component
    export default class VButton extends Vue {
        @Prop({default: ""}) private alt!: string;
        @Prop({default: false}) private disabled!: boolean;

        private onClick(payload: MouseEvent): void {
            this.flash(payload);
            this.$emit("click");
        }

        private flash(payload: MouseEvent): void {
            if (payload.target === null) {
                return;
            }

            // @ts-ignore
            const original = payload.target.style.backgroundColor;
            // @ts-ignore
            payload.target.style.backgroundColor = "#007ACC";
            setTimeout(() => {
                if (payload.target === null) {
                    return;
                }
                // @ts-ignore
                payload.target.style.backgroundColor = original;
            }, 100);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/app";

    img {
        pointer-events: none;
    }

    button {
        background-color: transparent;
        outline: none;
        border: none;

        &:hover, &:focus {
            filter: brightness(120%);
        }
    }
</style>
