<template>
    <div class="check-pill"
         :class="{'success': isSuccess, 'fail': isFail}"
         @click="onClick">
        <button>
            <vue-svg v-show="isSuccess" name="check"/>
            <vue-svg v-show="isFail" name="cross"/>
        </button>
        <span class="caption" v-text="caption"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import VueSvg from "@/components/VueSvg.vue";
    import {loseFocus} from "@/support";

    export enum CheckState {
        None,
        Success,
        Fail,
    }

    @Component({
        components: {VueSvg},
    })
    export default class CheckPill extends Vue {
        @Prop({default: () => CheckState.None}) private state!: CheckState;
        @Prop({default: "Caption"}) private caption!: string;

        private get isSuccess(): boolean {
            return this.state === CheckState.Success;
        }

        private get isFail(): boolean {
            return this.state === CheckState.Fail;
        }

        private onClick(event: MouseEvent) {
            this.$emit("input", this.getNextState());
            this.$nextTick(loseFocus);
        }

        private getNextState() {
            switch (this.state) {
                case CheckState.None:
                    return CheckState.Success;
                case CheckState.Success:
                    return CheckState.Fail;
                case CheckState.Fail:
                    return CheckState.None;
                default:
                    return;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/app";

    .caption {
        font-size: 14px;
        font-weight: bold;
    }

    .check-pill {
        background-color: $vs_gray;
        border: 2px solid $vs_light_gray;

        &:hover {
            cursor: pointer;

            button {
                background-color: $vs_light_blue;
            }
        }

        &.success {
            background-color: $vs_green;
            border-color: $dark_green;

            button {
                border-color: $dark_green;
                fill: $dark_green;
            }

            .caption {
                color: $dark_green;
            }
        }

        &.fail {
            background-color: $light_red;
            border-color: $red;

            button {
                border-color: $red;
                fill: $red;
            }

            .caption {
                color: $red;
            }
        }

        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 150px;
        height: 30px;
        border-radius: 7px;

        button {
            width: 20px;
            height: 20px;
            background-color: $vs_white;
            border: 2px solid $vs_dark_gray;
            margin: 0 15px;
            outline: none;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover, &:focus {
                cursor: pointer;
                background-color: $vs_light_blue;
            }
        }
    }
</style>
