<template>
    <div class="project-feedback">
        <div class="project-name">
            <h2>Project Name:</h2>
            <input type="text"
                   :value="$store.state.projectName"
                   @blur="$store.commit('setProjectName', $event.target.value)">
        </div>
        <div class="students">
            <h2>Student(s):</h2>
            <div class="input-group">
                <div class="student-name-wrapper"
                     v-for="(student, index) in students">
                    <input type="text"
                           :value="student"
                           @keypress.ctrl="()=>null"
                           :id="`student-${index}`"
                           @blur="event => updateStudent(index, event.target.value)"
                           @keypress.enter="goToNext(index)"/>
                    <v-button class="delete-student" @click="deleteStudent(index)">
                        X
                    </v-button>
                </div>

                <input placeholder="You may insert another student here..."
                       v-model="newStudent"
                       id="new-student"
                       @input="addNewStudent"/>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import VButton from "@/components/VButton.vue";

    @Component({
        components: {VButton}
    })
    export default class ProjectFeedback extends Vue {
        private newStudent: string = "";

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
        justify-content: space-around;
    }

    .students {
        .input-group {
            padding-right: 10px;
            max-height: 110px;
            overflow-y: auto;
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


    input {
        width: 200px;
        padding-right: 35px;
    }

    h2 {
        color: $vs_white;
        font-weight: normal;
        font-size: 1rem;
    }

</style>
