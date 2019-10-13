import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import {IAppModule} from "@/types";

@Module({dynamic: true, name: "app", store})
class AppModuleCore extends VuexModule implements IAppModule {
    public isBusy: boolean = false;
    public students: string[] = [];

    @Action
    public changeBusyTo(isBusy: boolean) {
        this.context.commit("SET_IS_BUSY", isBusy);
    }

    @Action
    public addStudent(student: string) {
        this.context.commit("SET_STUDENTS", [...this.students, student]);
    }

    @Action
    public removeStudent(id: number) {
        this.students.splice(id, 1);
        this.context.commit("SET_STUDENTS", [...this.students]);
    }

    @Action
    public editStudent({id, name}: { id: number, name: string }) {
        this.students[id] = name;
        this.context.commit("SET_STUDENTS", [...this.students]);
    }

    @Mutation
    private SET_IS_BUSY(isBusy: boolean): void {
        this.isBusy = isBusy;
    }

    @Mutation
    private SET_STUDENTS(students: string[]): void {
        this.students = students;
    }
}

export const AppModule = getModule(AppModuleCore);
