<template>
    <div class="project-feedback">
        <div class="flex justify-between">
            <div class="project-name-and-day">
                <div>
                    <h2>Project Name:</h2>
                    <input type="text"
                           placeholder="Enter the name of the project here..."
                           :value="$store.state.projectName"
                           @blur="$store.commit('setProjectName', $event.target.value)">
                </div>
                <div>
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
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import VButton from "@/components/VButton.vue";
    import Datepicker from "vuejs-datepicker";
    import VueSvg from "@/components/VueSvg.vue";

    @Component({
        components: {VueSvg, VButton, Datepicker},
    })
    export default class ProjectFeedback extends Vue {
        private newStudent: string = "";
        private date: Date = new Date();


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

    .project-feedback {
        display: flex;
        flex-direction: column;
        padding: 0 20px;
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

    .general-feedback {
        margin-top: 5px;
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
