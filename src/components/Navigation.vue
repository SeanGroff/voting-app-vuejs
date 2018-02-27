<template>
  <nav
    class="navbar"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">Pollz</div>
        <button
          class="button navbar-burger"
          :class="{ 'is-active': isActive }"
          @click="isActive = !isActive"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        class="navbar-menu"
        :class="{ 'is-active': isActive }"
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
            class="navbar-item"
            :class="{'hide': isAuthorized}"
            to="/signup"
          >
            Sign up
          </router-link>
          <router-link
            class="navbar-item"
            :class="{'hide': isAuthorized}"
            to="/login"
          >
            Login
          </router-link>
          <div
            class="navbar-item has-dropdown is-hoverable"
          >
            <router-link
              class="navbar-router-link"
              :class="{'hide': !isAuthorized}"
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
