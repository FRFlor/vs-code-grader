import {Vue} from "vue-property-decorator";
import * as Vuex from "vuex";
import {Store} from "vuex";
import undoRedo from "undo-redo-vuex";
import {IStoreRoot} from "@/types";
import masterModule from "./modules/MasterModule.js";
// @ts-ignore
console.log({masterModule});
Vue.use(Vuex);

// @ts-ignore
const store: Store<IStoreRoot> = new Vuex.Store<IStoreRoot>({
        ...masterModule,
        plugins: [
            undoRedo({
                ignoreMutations: [],
            }),
        ],
    },
);

export default store;
