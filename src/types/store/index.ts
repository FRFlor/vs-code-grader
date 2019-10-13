import {IAppModule} from "./IAppModule";
import {ITabsModule} from "@/types/store/ITabsModule";

export * from "./IAppModule";
export * from "./ITabsModule";

export interface IStoreRoot {
    app: IAppModule;
    tabs: ITabsModule;
}
