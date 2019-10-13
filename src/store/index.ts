import {Vue} from "vue-property-decorator";
import * as Vuex from "vuex";
import {Store} from "vuex";
import {IStoreRoot} from "@/types";

Vue.use(Vuex);

const store: Store<IStoreRoot> = new Vuex.Store<IStoreRoot>({});

export default store;
