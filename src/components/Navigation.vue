<template>
  <nav
    class="navbar"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">Pollz</div>
        <button
          :class="{ 'is-active': isActive }"
          class="button navbar-burger"
          @click="isActive = !isActive"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        :class="{ 'is-active': isActive }"
        class="navbar-menu"
      >
        <div
          class="navbar-start"
          @click="isActive = !isActive"
        >
          <router-link
            class="navbar-item is-hoverable"
            to="/"
            exact
          >
            Home
          </router-link>
        </div>
        <div
          class="navbar-end"
          @click="isActive = !isActive"
        >
          <router-link
            :class="{'hide': isAuthorized}"
            class="navbar-item"
            to="/signup"
          >
            Sign up
          </router-link>
          <router-link
            :class="{'hide': isAuthorized}"
            class="navbar-item"
            to="/login"
          >
            Login
          </router-link>
          <div
            class="navbar-item has-dropdown is-hoverable"
          >
            <router-link
              :class="{'hide': !isAuthorized}"
              class="navbar-router-link"
              style="margin: auto"
              to="/mypolls"
            >
              My Polls
            </router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link
                class="navbar-item"
                to="/new">
                New
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters(['isAuthorized'])
  }
}
</script>

<style scoped>

</style>
