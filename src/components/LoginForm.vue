<template>
  <form
    class="columns is-centered is-marginless"
    @submit.prevent="handleSubmit">
    <div
      class="column"
      style="max-width: 512px">
      <base-header>Welcome!</base-header>
      <div class="field">
        <label
          class="label"
          for="email">
          Email
        </label>
        <div class="control has-icons-left">
          <input
            v-model="email"
            v-validate="'required|email'"
            class="input"
            :class="{ 'is-danger': errors.has('email') }"
            type="email"
            name="email"
            placeholder="Email"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-envelope" />
          </span>
        </div>
        <p
          v-show="errors.has('email')"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ errors.first('email') }}
        </p>
      </div>

      <div class="field">
        <label
          class="label"
          for="password">
          Password
        </label>
        <div class="control has-icons-left">
          <input
            v-model="password"
            v-validate="'required|min:8'"
            class="input"
            :class="{ 'is-danger': errors.has('password')}"
            type="password"
            name="password"
            placeholder="Password"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-unlock-alt" />
          </span>
        </div>
        <p
          v-show="errors.has('password')"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ errors.first('password') }}
        </p>
        <p
          v-show="authError"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ authError }}
        </p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            class="button is-success is-link"
            type="submit"
          >
            Submit
          </button>
        </div>
        <div class="control">
          <router-link
            to="/"
            class="button is-danger is-link"
          >
            Cancel
          </router-link>
        </div>
        <div
          class="control"
          style="margin-left: auto"
          type="submit"
        >
          <router-link
            to="/signup"
            class="button is-info is-link"
          >
            Register
          </router-link>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import BaseHeader from '@/components/BaseHeader'

export default {
  components: {
    BaseHeader
  },
  data() {
    return {
      email: '',
      password: '',
      authError: ''
    }
  },
  methods: {
    handleSubmit: async function() {
      try {
        const errStatus = await this.$validator.validateAll()

        if (!errStatus) {
          console.log('Fix errors')
          return
        }

        const { email, password } = this.$data

        const response = await axios.post('/login', {
          email,
          password
        })

        if (localStorage.getItem('token')) {
          localStorage.removeItem('token')
          localStorage.setItem('token', response.token)
        } else {
          localStorage.setItem('token', response.token)
        }

        this.$router.push('/')
      } catch (err) {
        this.authError = 'Incorrect username/password, please try again.'
      }
    }
  }
}
</script>
