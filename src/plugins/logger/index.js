import Vue from "vue";
import VueLogger from "vuejs-logger";

Vue.use(VueLogger, {
  isEnabled: true,
  logLevel: process.env.VUE_APP_DEBUG_LEVEL,
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true,
});

export const log = Vue.$log;
