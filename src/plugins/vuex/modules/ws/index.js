import { log } from "@/plugins/logger/index";
import eventHandlers from "./events";
import * as types from "./mutation-types";

const ws = {
  namespaced: true,
  state: {
    ws: null,
    isAuthed: false,
    isOnline: false,
    authing: false,
    wsError: "",
  },
  mutations: {
    [types.SET_AUTH](state, status) {
      state.isAuthed = status;
    },
    [types.SET_WS_CONN_STATUS](state, status) {
      state.isOnline = status;
    },
    [types.SET_LOADING](state, type, status) {
      switch (type) {
        case "auth":
          state.authing = status;
      }
    },
    [types.SET_WS_ERROR](state, error) {
      if (error != "") {
        log.error(error);
      }
      state.wsError = error;
      setTimeout(function () {
        state.wsError = "";
      }, 5000);
    },
  },
  actions: {
    resetError({ commit }) {
      log.debug("Reseting error");
      commit(types.SET_WS_ERROR, "");
    },
    auth({ state, rootState, commit }) {
      log.debug("Auth action");
      commit(types.SET_AUTH, false);
      if (!state.isOnline) {
        log.warn("Can't auth! WS not connected!");
        return;
      }
      state.ws.send(
        JSON.stringify({
          command: "auth",
          data: { name: rootState.user.username },
        })
      );
    },
    connectWs({ state, dispatch, commit }) {
      log.debug("Connecting to server");
      commit(types.SET_WS_CONN_STATUS, false);
      try {
        state.ws = new WebSocket(process.env.VUE_APP_BACKEND_WS_URL + "");
        state.ws.onopen = (e) => dispatch("onWsConnected", e);
        state.ws.onmessage = (e) => dispatch("onWsMessage", e);
        //TODO
        // state.ws.onerror = (e) => dispatch("onWsDisconnected", e);
        // state.ws.onclose = (e) => dispatch("onWsDisconnected", e);
      } catch (e) {
        state.ws = null;
        commit(types.SET_WS_CONN_STATUS, false);
        throw new Error(e.message);
      }
    },
    onWsConnected({ state, commit }, e) {
      log.debug("WS connected", e);
      commit(types.SET_WS_CONN_STATUS, true);
      state.ws.send(
        JSON.stringify({
          command: "hello",
          data: {},
        })
      );
    },
    onWsMessage(store, e) {
      //TODO heartbeat
      log.debug("message from ws: ", e);

      let event = {};

      try {
        event = JSON.parse(e.data);
      } catch (e) {
        return log.warn("Unable to parse ws event", e);
      }

      const commandName = event?.command;

      if (commandName == "hello") {
        log.debug("Server hello");
        return;
      }

      if (!eventHandlers[commandName])
        return log.warn(`Unknown command `, commandName);

      eventHandlers[commandName](store, event.data);
    },
  },
  getters: {
    ws(state) {
      return state.ws;
    },
    isAuthed(state) {
      return state.isAuthed;
    },
    isOnline(state) {
      return state.isOnline;
    },
    wsError(state) {
      return state.wsError;
    },
  },
};

export default ws;
