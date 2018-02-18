<template>
  <nav
    class="navbar"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">Pollz</div>
        <button
          class="button navbar-burger is-active"
          @click="hamburgerClick"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <router-link
            class="navbar-item is-hoverable is-active"
            to="/"
            @click="handleClick('home')"
          >
            Home
          </router-link>
        </div>
        <div class="navbar-end">
          <router-link
            class="navbar-item is-active"
            to="/signup"
            @click="handleClick('signup')"
          >
            Sign up
          </router-link>
          <router-link
            class="navbar-item is-active"
            to="/login"
            @click="handleClick('login')"
          >
            Login
          </router-link>
          <div
            class="navbar-item has-dropdown is-hoverable is-active"
          >
            <router-link
              class="navbar-router-link"
              to="/mypolls"
              @click="handleClick('mypolls')"
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
export default {
  data() {
    return {
      activeItem: ''
    }
  }
}
</script>

<style scoped>

</style>
