<template>
  <div id="app">
    <navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/navigation/Navigation'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
@import '../node_modules/normalize.css/normalize.css';
@import '../node_modules/bulma/bulma.sass';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#root {
  width: 100%;
  height: 100vh;
}

.is-full-height {
  height: 100%;
}

.hide {
  display: none !important;
}
</style>
