<template>
  <div class="wrapper">
    <div class="title">Игроки:</div>
    <div class="list">
      <div class="playerItem" v-for="player in playerList" :key="player">{{ player }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Player-list",
  data() {
    return {};
  },

  computed: {
    ...mapGetters("game", {playerList: "getPlayers"})
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-content: center;
  flex-direction: column;
  width: 200px;
  height: 500px;
  background-color: aqua;
  position: absolute;
  right: 10px;
  border: 2px solid gray;
  border-radius: 10px;
}
</style>
