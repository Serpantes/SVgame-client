import { log } from "@/plugins/logger/index";
/**
 * Init storage base state event
 * @param store
 * @param eventData
 */
export const result = function ({ commit }, eventData = {}) {
  log.debug("result of ", eventData.command, " is ", eventData.result);
  if (eventData.command == "auth") {
    handleAuth(commit, eventData);
  }
};

function handleAuth(commit, eventData) {
  commit("SET_LOADING", "auth", false);
  if (eventData.result == "success") {
    log.debug("Authed");
    commit("SET_AUTH", true);
  } else {
    log.warn("Auth failed, ", eventData?.reason);
    commit("SET_WS_ERROR", eventData?.reason || "unknown ws result error");
    commit("SET_AUTH", false);
  }
}
