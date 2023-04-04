<template>
    <div class="wrapper">
      <label for="username">Имя: </label>
      <input type="text" v-model="username" id="username">
      <button @click.prevent="authButton()">Войти</button>
      <b-spinner v-if="loading" variant="success" type="grow"></b-spinner>
    </div>
  </template>
  
  <script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
    name: "Auth-input",
    data() {
      return {
        loading: false
      };
    },
  
    mounted() {

    },

    computed: {
        ...mapGetters("ws", ["ws"]),
        ...mapGetters("user", ["getUsername"]),
        username:{
            get(){
              return this.getUsername
            },
            set(newValue) {
              this.setUsername(newValue)
            }
        }
    },
    methods:{
        ...mapActions("ws", ["auth"]),
        ...mapMutations("user", {setUsername: "SET_USERNAME"}),
      authButton(){
        this.$log.debug("Trying to auth with name ", this.username)
        this.loading = true
        this.auth()
      }
    }
  };
  </script>
  
<style scoped>
.wrapper {
    width: 900px;
    height: 200px;
}
</style>