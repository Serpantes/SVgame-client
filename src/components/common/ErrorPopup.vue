<template>
    <div class="wrapper" @click="resetError()">
      {{ error }}
    </div>
  </template>
  
  <script>
import { mapActions } from 'vuex';

  
  export default {
    name: "ws-error",
    data() {
      return {
      };
    },
    props: {
      error: {
        type: String,
        default: "Unknown error"
      }
    },
    computed: {
    },
    methods: {
      ...mapActions("ws", ["resetError"])
    },
  };
  </script>
  
  <style scoped>
  .wrapper {
    top: 10px;
    position: absolute;
    width: 100px;
    height: 30px;
    background-color: red;
  }
  </style>