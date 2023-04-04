<template>
  <div id="app">
    <ServerStatus />
    <div class="app">
      <Auth v-if="!isAuthed" />
      <div v-else>
        <Upload />
      </div>
    </div>
  </div>
</template>

<script>
import Upload from "./components/Upload.vue";
import Auth from "./components/Auth.vue";
import ServerStatus from "./components/ServerStatus.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Upload,
    Auth,
    ServerStatus,
  },
  mounted() {
    this.connectWs()
  },
  computed: {
    ...mapGetters("ws", ["isAuthed"]),
  },
  methods:{
    ...mapActions("ws", ["connectWs"])
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.app {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
</style>
