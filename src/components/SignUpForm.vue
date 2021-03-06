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
            :class="{ 'is-danger': $v.name.$error }"
            class="input"
            type="text"
            name="name"
            placeholder="Name"
            @input="$v.name.$touch"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-user" />
          </span>
        </div>
        <div v-show="$v.name.$error">
          <p
            v-show="!$v.name.required"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Name is required' }}
          </p>
          <p
            v-show="!$v.name.minLength"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Invalid name' }}
          </p>
        </div>
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
            :class="{ 'is-danger': $v.email.$error }"
            class="input"
            type="email"
            name="email"
            placeholder="Email"
            @input="$v.email.$touch"
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
            {{ 'Email is required' }}
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
            :class="{ 'is-danger': $v.password.$error }"
            class="input"
            type="password"
            name="password"
            placeholder="Password"
            @input="$v.password.$touch"
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
            {{ 'Password is required' }}
          </p>
          <p
            v-show="!$v.password.minLength"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Password must be at least 8 characters in length' }}
          </p>
          <p
            v-show="!$v.password.sameAsConfirmPassword"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Passwords do not match' }}
          </p>
        </div>
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
            :class="{ 'is-danger': $v.confirmPassword.$error }"
            class="input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            @input="$v.confirmPassword.$touch"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-unlock-alt" />
          </span>
        </div>
        <div v-show="$v.confirmPassword.$error">
          <p
            v-show="!$v.confirmPassword.required"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Password is required' }}
          </p>
          <p
            v-show="!$v.confirmPassword.minLength"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Password must be at least 8 characters in length' }}
          </p>
          <p
            v-show="!$v.confirmPassword.sameAsPassword"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Passwords do not match' }}
          </p>
        </div>
        <p
          v-show="errorMessage"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ errorMessage }}
        </p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            :class="{ 'is-loading': loadingStatus }"
            :disabled="isDisabled"
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
import { mapActions, mapGetters } from 'vuex'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
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
      currentUser: ''
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(2)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      sameAsConfirmPassword: sameAs('confirmPassword')
    },
    confirmPassword: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs('password')
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
    ...mapActions(['registerCurrentUser', 'updateErrorMessage', 'updateToken']),
    async handleSubmit() {
      if (this.$v.$invalid) return

      const { name, email, password, confirmPassword } = this.$data

      const res = await this.registerCurrentUser({
        name,
        email,
        password,
        confirmPassword
      })

      if (!res.error) {
        this.updateToken(res.token)
        this.$router.push('/')
      }
    }
  }
}
</script>
