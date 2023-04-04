import * as types from "./mutation-types";
import { log } from "@/plugins/logger/index";

const user = {
  namespaced: true,
  state: {
    username: "Петечка",
  },
  mutations: {
    [types.SET_USERNAME](state, username) {
      log.debug("username set: ", username);
      state.username = username;
    },
  },
  actions: {},
  getters: {
    getUsername(state) {
      return state.username;
    },
  },
};

export default user;
