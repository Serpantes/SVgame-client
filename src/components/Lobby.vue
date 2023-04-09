<template>
  <div class="wrapper">
    Привет, {{ username }}! <br> <br>
    <CreateGame v-if="!gameActive"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CreateGame from './lobby/CreateGame.vue';

export default {
    name: "Lobby-component",
    data() {
        return {};
    },
    computed: {
        ...mapGetters("user", { username: "getUsername" }),
        ...mapGetters("game", { gameActive: "isActive" })
    },
    methods: {
        test(msg) {
            this.$log.debug("need to send msg to ws: ", msg);
        },
    },
    components: { CreateGame }
};
</script>

<style scoped>
</style>