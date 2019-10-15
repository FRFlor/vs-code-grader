<template>
    <div class="comment-writer">
        <h2>Comment on selected code:</h2>
        <div class="flex">
            <div class="custom-comment-wrapper flex-1">
                <textarea id="write-comment"
                          @keypress.shift.enter="sendComment"
                          :class="{'point-position': $store.state.isPointingPosition}"
                          @input="$store.commit('setEditingComment', $event.target.value)"
                          :value="$store.state.editingComment"
                          class="custom-comment"></textarea>
            </div>
            <div class="flex column">
                <v-button class="big-button green" style="margin-bottom: 0.35rem">
                    <vue-svg name="save"/>
                    <span>Save comment</span>
                </v-button>
                <v-button class="big-button red">
                    <vue-svg name="cross"/>
                    <span>Delete comment</span>
                </v-button>
            </div>
        </div>

        <div>
            <h2 style="margin-top: 1rem;">Quick Comments: </h2>

            <div class="flex justify-between">
                <div class="flex-1 quick-comments-wrapper">
                    <div class="flex justify-between" style="margin-bottom: 0.3rem">
                        <button>
                            <vue-svg name="talk"/>
                            <span>Academic dishonesty</span>
                        </button>
                        <button>
                            <vue-svg name="talk"/>
                            <span>Unused variable</span>
                        </button>
                    </div>
                    <div class="flex justify-between">
                        <button>
                            <vue-svg name="talk"/>
                            <span>Unclear variable name</span>
                        </button>
                        <button>
                            <vue-svg name="talk"/>
                            <span>Convoluted Solutions</span>
                        </button>
                    </div>
                    <div class="w-100 flex">
                        <input class="flex-1"
                               type="text"
                               placeholder="You may insert your own custom quick-comment here...">
                    </div>
                </div>

                <v-button class="big-button blue">
                    <vue-svg name="globe"/>
                    <span>Search Code Online</span>
                </v-button>
            </div>

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

        private sendComment() {
            this.$store.commit("saveComment");
        }

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

    .quick-comments-wrapper {
        margin-right: 2rem;

        button {
            width: 10rem;
            display: flex;
            padding: 0.2rem 0.35rem;

            span {
                margin-left: 0.35rem;
            }
        }

        input {
            margin-top: 1rem;
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
            max-height: 1.875rem;
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
