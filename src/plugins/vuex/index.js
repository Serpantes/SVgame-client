import Vue from "vue";
import Vuex from "vuex";
import ws from "./modules/ws/index";
import user from "./modules/user/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: 1,
  },
  getters: {
    getTest(state) {
      return state.test;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    ws,
    user,
  },
});
