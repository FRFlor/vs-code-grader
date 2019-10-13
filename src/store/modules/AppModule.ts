import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import {IAppModule} from "@/types";

@Module({dynamic: true, name: "app", store})
class AppModuleCore extends VuexModule implements IAppModule {
    public isBusy: boolean = false;

    @Action
    public changeBusyTo(isBusy: boolean) {
        this.context.commit("SET_IS_BUSY", isBusy);
    }

    @Mutation
    private SET_IS_BUSY(isBusy: boolean): void {
        this.isBusy = isBusy;
    }
}

export const AppModule = getModule(AppModuleCore);
