<template>
    <div class="comment-writer">
        <h2>Comment on selected code:</h2>
        <div class="flex">
            <div class="custom-comment-wrapper flex-1">
                <textarea class="custom-comment"></textarea>
            </div>
            <div class="flex column">
                <v-button class="big-button green" style="margin-bottom: 0.35rem">
                    <vue-svg name="play"/>
                    <span>Save comment</span>
                </v-button>
                <v-button class="big-button red">
                    <vue-svg name="cross"/>
                    <span>Delete comment</span>
                </v-button>
            </div>
        </div>

        <div>

            <h2>Quick Comments: </h2>
            <div>
                <button>Academic dishonesty</button>
                <button>Unused variable</button>
                <button>Unclear variable name</button>
                <button>Convoluted Solutions</button>
            </div>
            <input type="text" placeholder="You may insert your own custom quick-comment here...">
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import VButton from "@/components/VButton.vue";
    import VueSvg from "@/components/VueSvg.vue";

    @Component({
        components: {VueSvg, VButton}
    })
    export default class CommentWriter extends Vue {

    }
</script>

<style lang="scss" scoped>
    @import "../scss/app.scss";

    h2 {
        color: $vs_white;
        font-weight: normal;
        font-size: 0.8rem;
    }

    .custom-comment-wrapper {
        margin-right: 2rem;

        .custom-comment {
            width: 100%;
            height: 100%;
        }
    }

    .big-button {
        width: 10rem;

        &:hover {
            cursor: pointer;
        }

        &.blue {
            background-color: $lighter_blue;
            border: 2px solid $vs_dark_blue;
            fill: $vs_dark_blue;
        }

        &.red {
            background-color: $light_red;
            border: 2px solid $red;
            fill: $red;
        }

        &.green {
            background-color: $light_green;
            border: 2px solid $dark_green;
            fill: $dark_green;
        }

        display: flex;
        padding: 0.25rem 0.5rem;

        span {
            margin-left: 0.5rem;
            font-size: 0.8125rem;
        }
    }

</style>
