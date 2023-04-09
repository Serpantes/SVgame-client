//import { log } from "@/plugins/logger/index";
/**
 * Init storage base state event
 * @param store
 * @param eventData
 */
export const stateFull = function (store, eventData = {}) {
  store.commit("game/SAVE_PLAYERS_LIST", eventData.players, {
    root: true,
  });
  if (eventData.game == "inactive") {
    store.commit("game/SET_GAME_ACTIVITY", false, {
      root: true,
    });
  } else {
    store.commit("game/SET_GAME_ACTIVITY", true, {
      root: true,
    });
  }
};
