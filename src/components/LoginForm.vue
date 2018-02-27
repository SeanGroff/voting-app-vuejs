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
            @input="$v.email.$touch"
            class="input"
            :class="{ 'is-danger': $v.email.$error }"
            type="email"
            name="email"
            placeholder="Email"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-envelope" />
          </span>
        </div>
        <div v-show="$v.email.$error">
          <p
            v-show="!$v.email.required"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Email address required' }}
          </p>
          <p
            v-show="!$v.email.email"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Invalid email' }}
          </p>
        </div>
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
            @input="$v.password.$touch"
            class="input"
            :class="{ 'is-danger': $v.password.$error }"
            type="password"
            name="password"
            placeholder="Password"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-unlock-alt" />
          </span>
        </div>
        <div v-show="$v.password.$error">
          <p
            v-show="!$v.password.required"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Password required' }}
          </p>
          <p
            v-show="!$v.password.minLength"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Password must be at least 8 characters in length' }}
          </p>
        </div>
        <p
          v-show="errorMessage"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ 'Invalid username or password' }}
        </p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            class="button is-success is-link"
            :class="{ 'is-loading': loadingStatus }"
            type="submit"
            :disabled="isDisabled"
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
import { mapActions, mapGetters } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import BaseHeader from '@/components/BaseHeader'

export default {
  components: {
    BaseHeader
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  computed: {
    ...mapGetters(['errorMessage', 'loadingStatus']),
    isDisabled() {
      return this.$v.$invalid
    }
  },
  mounted() {
    this.updateErrorMessage('')
  },
  methods: {
    ...mapActions(['loginCurrentUser', 'updateErrorMessage']),
    async handleSubmit() {
      if (this.$v.invalid) return

      const { email, password } = this.$data

      const res = await this.loginCurrentUser({
        email,
        password
      })

      if (!res.error) {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token')
        }

        localStorage.setItem('token', res.token)
        this.$router.push('/')
      }
    }
  }
}
</script>
