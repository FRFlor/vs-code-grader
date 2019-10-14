<template>
    <div class="check-pill"
         :class="{'success': isSuccess, 'fail': isFail}"
         @click="onClick">
        <button>
            <vue-svg v-show="isSuccess" name="calendar"/>
            <vue-svg v-show="isFail" name="save"/>
        </button>
        <span class="caption">Loads</span>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import VueSvg from "@/components/VueSvg.vue";

    enum CheckState {
        None,
        Success,
        Fail
    }

    @Component({
        components: {VueSvg}
    })
    export default class CheckPill extends Vue {
        private state: CheckState = CheckState.None;

        private get isSuccess(): boolean {
            return this.state === CheckState.Success;
        }

        private get isFail(): boolean {
            return this.state === CheckState.Fail;
        }

        private onClick(event: MouseEvent) {
            this.switchState();
            setTimeout(this.loseFocus, 150);

        }

        private loseFocus() {
            if (!document.activeElement) {
                return;
            }

            if (document.activeElement.toString() == "[object HTMLButtonElement]") {
                (document.activeElement as HTMLButtonElement).blur();
            }
        }

        private switchState() {
            switch (this.state) {
                case CheckState.None:
                    return this.state = CheckState.Success;
                case CheckState.Success:
                    return this.state = CheckState.Fail;
                case CheckState.Fail:
                    return this.state = CheckState.None;
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
        border-color: $vs_light_gray;

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
