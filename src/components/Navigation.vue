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
              class="navbar-router-link navbar-dropdown-link"
              to="/mypolls"
            >
              My Polls
            </router-link>
            <div
              :class="{'hide': !isAuthorized}"
              class="navbar-dropdown is-boxed">
              <router-link
                class="navbar-item"
                to="/new">
                New
              </router-link>
            </div>
            <a
              :class="{'hide': !isAuthorized}"
              class="navbar-router-link navbar-dropdown-link"
              @click="handleLogoutClick"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters(['isAuthorized'])
  },
  methods: {
    ...mapActions(['logoutCurrentUser']),
    async handleLogoutClick() {
      try {
        const res = await this.logoutCurrentUser()

        if (res.success) {
          this.$router.replace('/login')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-dropdown-link {
  margin: 16px;
}
</style>
