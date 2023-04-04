<template>
  <div class="wrapper">
    Upload component
    <button @click.prevent="test('button pressed')">hi</button>
  </div>
</template>

<script>
export default {
  name: "Upload-test",
  data() {
    return {
    };
  },

  methods: {
    test(msg) {
      this.$log.debug("need to send msg to ws: ", msg)
    },
  },
};
</script>

<style scoped>
</style>