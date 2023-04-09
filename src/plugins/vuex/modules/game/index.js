import * as types from "./mutation-types";
import { log } from "@/plugins/logger/index";

const game = {
  namespaced: true,
  state: {
    players: [],
    isActive: false,
  },
  mutations: {
    [types.SAVE_PLAYERS_LIST](state, playersArr) {
      state.players = playersArr;
    },
    [types.SET_GAME_ACTIVITY](state, isActive) {
      log.debug("Game is now ", isActive);
      state.isActive = isActive;
    },
  },
  actions: {},
  getters: {
    getPlayers(state) {
      return state.players;
    },
    isActive(state) {
      return state.isActive;
    },
  },
};

export default game;
