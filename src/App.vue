<template>
  <div id="app">
   <pf></pf>
  </div>
</template>

<script>
import pf from './components/pf.vue'

export default {
  name: 'app',
  components: {
    pf
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  border: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
