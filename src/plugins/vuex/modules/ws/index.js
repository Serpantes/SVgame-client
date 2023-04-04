import { log } from "@/plugins/logger/index";
import eventHandlers from "./events";

const ws = {
  namespaced: true,
  state: {
    ws: null,
    isAuthed: false,
    isOnline: false,
  },
  mutations: {},
  actions: {
    auth({ state, rootState }) {
      log.debug("Auth action");
      state.isAuthed = false;
      if (!state.isOnline) {
        log.warn("Can't auth! WS not connected!");
        return;
      }
      state.ws.send(
        JSON.stringify({
          command: "test",
          data: { name: rootState.user.username },
        })
      );
    },
    connectWs({ state, dispatch }) {
      log.debug("Connecting to server");
      state.isOnline = false;
      try {
        state.ws = new WebSocket(process.env.VUE_APP_BACKEND_WS_URL);
        state.ws.onopen = (e) => dispatch("onWsConnected", e);
        state.ws.onmessage = (e) => dispatch("onWsMessage", e);
        //TODO
        // state.ws.onerror = (e) => dispatch("onWsDisconnected", e);
        // state.ws.onclose = (e) => dispatch("onWsDisconnected", e);
      } catch (e) {
        state.ws = null;
        state.isOnline = false;
        throw new Error(e.message);
      }
    },
    onWsConnected({ state }, e) {
      log.debug("WS connected", e);
      state.isOnline = true;
      state.ws.send("Hi, im vue app");
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
  },
};

export default ws;
