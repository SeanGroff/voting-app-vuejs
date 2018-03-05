<template>
  <div id="app">
    <navigation />
    <base-hero />
    <router-view/>
  </div>
</template>

<script>
import { persistor } from '@/graphql/apolloClient'
import Navigation from '@/components/Navigation'
import BaseHero from '@/components/BaseHero'

export default {
  name: 'App',
  components: {
    Navigation,
    BaseHero
  },
  async mounted() {
    await persistor.restore()
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

.input-button {
  margin-left: 8px;
}
</style>
