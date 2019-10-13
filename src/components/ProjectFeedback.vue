<template>
    <div class="project-feedback">
        <div class="students">
            <h2>Student(s):</h2>
            <input type="text"
                   v-for="(student, index) in app.students"
                   :value="student"
                   @input="event => updateStudent(index, event.target.value)"
                   :id="`student-${index}`"
                   @keypress.enter="goToNext(index)"/>
            <input placeholder="You may insert another student here..."
                   v-model="newStudent"
                   id="new-student"
                   @input="addNewStudent"/>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import InputBox from "@/components/InputBox.vue";
    import {AppModule} from "@/store/modules/AppModule";

    @Component({
        components: {InputBox}
    })
    export default class ProjectFeedback extends Vue {
        private app = AppModule;
        private newStudent: string = "";

        private updateStudent(id: number, name: string) {
            this.app.editStudent({id, name});
        }

        private goToNext(index: number) {
            const target = (index === this.app.students.length - 1)
                ? "new-student" : `student-${index + 1}`;

            this.getInput(target).focus();
        }

        private addNewStudent() {
            this.app.addStudent(this.newStudent);
            this.newStudent = "";
            this.$nextTick(() => {
                this.getInput(`student-${this.app.students.length - 1}`).focus();
            });
        }

        private getInput(id: string): HTMLInputElement {
            return document.getElementById(id) as HTMLInputElement;
        }
    }
</script>

<style lang="scss" scoped>
    .project-feedback {
        width: 250px;
        height: 250px;
    }
</style>
