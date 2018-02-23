<template>
  <form
    class="columns is-centered is-marginless"
    @submit.prevent="handleSubmit">
    <div
      class="column"
      style="max-width: 512px">
      <base-header>Get Started Creating Polls Today!</base-header>

      <div class="field">
        <label
          class="label"
          for="name">
          Name
        </label>
        <div class="control has-icons-left">
          <input
            v-model="name"
            v-validate="'required|alpha_spaces'"
            class="input"
            :class="{ 'is-danger': errors.has('name') }"
            type="text"
            name="name"
            placeholder="Name"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-user" />
          </span>
        </div>
        <p
          v-show="errors.has('name')"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ errors.first('name') }}
        </p>
      </div>

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
            v-validate="'required|confirmed:confirmPassword|min:8'"
            class="input"
            :class="{ 'is-danger': errors.has('password') }"
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
      </div>

      <div class="field">
        <label
          class="label"
          for="confirmPassword">
          Confirm Password
        </label>
        <div class="control has-icons-left">
          <input
            v-model="confirmPassword"
            v-validate="'required|confirmed:password|min:8'"
            class="input"
            :class="{ 'is-danger': errors.has('confirmPassword') }"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-unlock-alt" />
          </span>
        </div>
        <p
          v-show="errors.has('confirmPassword')"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ errors.first('confirmPassword') }}
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
            Register
          </button>
        </div>
        <div class="control">
          <router-link
            to="/"
            class="button is-danger is-link">
            Cancel
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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

        const { name, email, password, confirmPassword } = this.$data

        const response = await axios.post('/signup', {
          name,
          email,
          password,
          confirmPassword
        })

        if (localStorage.getItem('token')) {
          localStorage.removeItem('token')
          localStorage.setItem('token', response.token)
        } else {
          localStorage.setItem('token', response.token)
        }

        this.$router.push('/')
      } catch (err) {
        this.authError = err.response.data
      }
    }
  }
}
</script>
