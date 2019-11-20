import Vue from "vue";
import App from "./App.vue";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

Vue.config.productionTip = false;
Vue.use(PerfectScrollbar);

new Vue({
  render: h => h(App)
}).$mount("#app");
