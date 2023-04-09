<template>
  <div id="app">
    <ErrorPopup v-if="wsError" :error="wsError"/>
    <ServerStatus />
    <PlayerList/>
    <div class="app">
      <Auth v-if="!isAuthed" />
      <div v-else>
        <Lobby />
      </div>
    </div>
  </div>
</template>

<script>
import Lobby from "./components/Lobby.vue";
import Auth from "./components/Auth.vue";
import ServerStatus from "./components/ServerStatus.vue";
import { mapActions, mapGetters } from "vuex";
import PlayerList from "./components/playerList/PlayerList.vue";
import ErrorPopup from "./components/common/ErrorPopup.vue";

export default {
  name: "App",
  components: {
    Lobby,
    Auth,
    ServerStatus,
    PlayerList,
    ErrorPopup
},
//TODO display ws-error component
  mounted() {
    this.connectWs()
  },
  computed: {
    ...mapGetters("ws", ["isAuthed", "wsError"]),
  },
  methods:{
    ...mapActions("ws", ["connectWs"])
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
