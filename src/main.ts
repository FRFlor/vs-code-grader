import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VToolTip from "v-tooltip";
import VueCodeHighlight from "vue-code-highlight";
import "./svgs";

Vue.config.productionTip = false;

Vue.use(VueCodeHighlight);
Vue.use(VToolTip);

new Vue({
    render: (h) => h(App),
    store,
}).$mount("#app");
