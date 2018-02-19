<template>
  <div id="app">
    <navigation />
    <router-view/>
  </div>
</template>

<script>
import { persistor } from './graphql/apolloClient'
import Navigation from './components/navigation/Navigation'

export default {
  name: 'App',
  components: {
    Navigation
  },
  async mounted() {
    console.log('loading...')
    try {
      await persistor.restore()
      console.log('cache persisted from localStorage!')
      console.log('done loading!')
    } catch (err) {
      console.log(err)
      console.log('done loading!')
    }
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
