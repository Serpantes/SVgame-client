<template>
    <div class="wrapper">
      <div>Сервер: </div>
      <div v-if="isOnline" class="isOnline status"> Онлайн</div>
      <div v-if="!isOnline" class="isOffline status"> Оффлайн</div>
      <div v-if="!isOnline" class="reconnectWrap">
        <button @click.prevent="connectWs()">Переподключиться</button>
      </div>
    </div>
  </template>
  
  <script>
import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "Server-status",
    data() {
      return {
      };
    },
  
    computed:{
        ...mapGetters("ws", ["isOnline"])
    },
    methods:{
        ...mapActions("ws", ["connectWs"])
    }
  };
  </script>
  
  <style scoped>
  .wrapper {
    right: 10px;
    top: 10px;
    position: absolute;
    width: 200px;
  }

  .status {
    font-weight: bold;
  }
  .isOnline {
    color: green;
  }
  .isOffline {
    color: red;
  }
  </style>