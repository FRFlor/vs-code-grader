<template>
    <div class="project-feedback">
        <button class="analyze-comments"
                @click="onAnalyzeClicked">
            <vue-svg name="play"/>
            <span style="margin-left: 10px;"
                  v-text="$store.state.commentAnalysisProgress === null ? 'Analyze Comments' : 'Analyzing ...'"/>
        </button>
        <div class="flex justify-between">
            <div class="project-name-and-day">
                <div>
                    <h2>Project Name:</h2>
                    <input type="text"
                           placeholder="Enter the name of the project here..."
                           :value="$store.state.projectName"
                           @blur="$store.commit('setProjectName', $event.target.value)">
                </div>
                <div style="margin-top: 15px;">
                    <h2>Date:</h2>
                    <div class="date-picker">
                        <datepicker class="date-input"
                                    ref="datepicker"
                                    @input="$store.commit('setDate', $event)"
                                    :value="$store.state.date"/>
                        <v-button @click="$refs.datepicker.showCalendar()">
                            <vue-svg name="calendar" class="calendar-icon"/>
                        </v-button>
                    </div>
                </div>

            </div>
            <div class="students">
                <h2>Student(s):</h2>
                <div class="input-group">
                    <div class="student-name-wrapper"
                         v-for="(student, index) in students">
                        <input type="text"
                               :value="student"
                               :id="`student-${index}`"
                               @blur="event => updateStudent(index, event.target.value)"
                               @keypress.enter="goToNext(index)"/>
                        <v-button class="delete-student" @click="deleteStudent(index)">
                            X
                        </v-button>
                    </div>

                    <input placeholder="You may insert another student here..."
                           v-model="newStudent"
                           type="text"
                           id="new-student"
                           @input="addNewStudent"/>
                </div>
            </div>
        </div>
        <div class="general-feedback">
            <h2>General Feedback:</h2>
            <div class="flex">
                <textarea placeholder="You may insert a project-wise comment for the student in here..."
                          :value="$store.state.projectComment"
                          @keyup.enter="$store.commit('setProjectComment', $event.target.value)"
                          @blur="$store.commit('setProjectComment', $event.target.value)"
                />
            </div>
        </div>
        <div class="execution-and-comment">
            <div class="flex column">
                <check-pill class="pill"
                            caption="Loads"
                            @input="$store.commit('setLoadsState', $event)"
                            :state="$store.state.loadsState"/>
                <check-pill class="pill"
                            caption="Compiles"
                            @input="$store.commit('setCompilesState', $event)"
                            :state="$store.state.compilesState"/>
                <check-pill class="pill"
                            caption="Runs"
                            @input="$store.commit('setRunsState', $event)"
                            :state="$store.state.runsState"/>
            </div>

            <comment-coverage/>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import VButton from "@/components/VButton.vue";
    import Datepicker from "vuejs-datepicker";
    import VueSvg from "@/components/VueSvg.vue";
    import CommentCoverage from "@/components/CommentCoverage.vue";
    import CheckPill from "@/components/CheckPill.vue";
    import {loseFocus} from "@/support";

    @Component({
        components: {CheckPill, CommentCoverage, VueSvg, VButton, Datepicker},
    })
    export default class ProjectFeedback extends Vue {
        private newStudent: string = "";
        private date: Date = new Date();

        private onAnalyzeClicked() {
            this.$store.dispatch("analyzeCoverage");
            this.$nextTick(loseFocus);
        };

        private updateStudent(id: number, name: string) {
            console.log("update", name);
            if (name === "") {
                this.deleteStudent(id);
                return;
            }

            this.$store.commit("editStudent", {id, name});
        }

        private deleteStudent(id: number) {
            this.$store.commit("deleteStudent", id);
        }

        private goToNext(index: number) {
            const target = (index === this.$store.state.students.length - 1)
                ? "new-student" : `student-${index + 1}`;

            this.getInput(target).focus();
        }

        private addNewStudent() {
            this.$store.commit("addStudent", this.newStudent);
            this.newStudent = "";
            this.$nextTick(() => {
                this.getInput(`student-${this.$store.state.students.length - 1}`).focus();
            });
        }

        private getInput(id: string): HTMLInputElement {
            return document.getElementById(id) as HTMLInputElement;
        }

        private get students() {
            return this.$store.state.students;
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/app";

    button.analyze-comments {
        span {
            font-size: 13px;
        }

        width: 162px;
        height: 35px;
        display: flex;
        background-color: $lighter_blue;
        border: 2px solid $vs_dark_blue;
        outline: none;

        &:hover, &:focus {
            cursor: pointer;
            background-color: lighten($lighter_blue, 20%);
        }
    }

    .project-feedback {
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
    }

    .date-picker {
        display: flex;

        button {
            background-color: $vs_dark_gray;

            &:hover, &:focus {
                background-color: $vs_blue;
                cursor: pointer;
            }

            .calendar-icon {
                transform: scale(2);
                fill: white;
            }
        }

    }

    .students {
        .input-group {
            max-height: 80px;
            overflow-y: auto;

            input {
                padding-right: 25px;
            }
        }

        .student-name-wrapper {
            display: flex;
            margin-bottom: 10px;

            .delete-student {
                margin-left: -22px;
                color: hsl(355, 79%, 54%);
                font-weight: bolder;

                &:hover, &:focus {
                    background-color: hsl(4, 53%, 79%);
                    cursor: pointer;
                }
            }

        }
    }

    .execution-and-comment {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .pill {
            margin-bottom: 5px;
        }
    }

    .general-feedback {
        margin-top: 10px;
        display: flex;
        flex-direction: column;

        textarea {
            flex: 1;
            height: 50px;
        }
    }

    input {
        width: 200px;
    }

    h2 {
        color: $vs_white;
        font-weight: normal;
        font-size: 1rem;
    }
</style>
