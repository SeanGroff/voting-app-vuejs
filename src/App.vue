<template>
  <div id="app">
    <navigation />
    <base-hero />
    <transition name="fade">
      <router-view />
    </transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
