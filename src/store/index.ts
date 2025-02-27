import {Vue} from "vue-property-decorator";
import * as Vuex from "vuex";
import {Store} from "vuex";
import undoRedo from "undo-redo-vuex";
import {IStoreRoot} from "@/types";
import masterModule from "./modules/MasterModule";

Vue.use(Vuex);

// @ts-ignore
const store: Store<IStoreRoot> = new Vuex.Store<IStoreRoot>({
        ...masterModule,
        plugins: [
            undoRedo({
                ignoreMutations: ["setCommentAnalysisProgress", "changeBusyTo", "setIsPointingPosition"],
            }),
        ],
    },
);

export default store;
