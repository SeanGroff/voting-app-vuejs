<template>
  <form
    class="columns is-mobile is-centered is-marginless"
    @submit.prevent="handleSubmit"
  >
    <div class="column is-narrow">
      <base-header>Create a New Poll</base-header>

      <div class="field">
        <label
          class="label"
          for="name"
        >
          Name your poll
        </label>
        <div
          class="control"
        >
          <input
            v-model="name"
            :class="{ 'is-danger': $v.name.$error }"
            class="input"
            type="text"
            name="name"
            placeholder="Name of Poll"
            @input="$v.name.$touch"
          >
        </div>
        <div v-show="$v.name.$error">
          <p
            v-show="!$v.name.required"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Poll name required' }}
          </p>
        </div>
      </div>

      <div
        v-for="(option, index) in options"
        :key="index"
        class="field"
      >
        <label
          :for="index"
          class="label"
        >
          {{ `Option ${index + 1}` }}
        </label>
        <div class="is-flex">
          <input
            v-model="options[index].name"
            :name="index"
            class="input"
            type="text"
            placeholder="Poll Option"
          >
          <button
            class="button is-danger input-button"
            type="button"
            tabindex="-1"
            @click="removeOption(index)"
          >
            <span class="icon">
              <i class="fas fa-times" />
            </span>
          </button>
        </div>
      </div>

      <div class="field is-grouped">
        <p class="control">
          <button
            class="button is-info"
            type="button"
            @click="addOption"
          >
            <span class="icon">
              <i class="fas fa-plus" />
            </span>
            <span>Add Option</span>
          </button>
        </p>
        <p class="control">
          <button
            :disabled="isDisabled"
            class="button is-success"
            type="submit"
          >
            <span class="icon">
              <i class="fas fa-check" />
            </span>
            <span>Create Poll</span>
          </button>
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
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import BaseHeader from '@/components/BaseHeader'
import createPoll from '@/graphql/createPoll'

export default {
  components: {
    BaseHeader
  },
  data() {
    return {
      name: '',
      errorMessage: '',
      options: [{ name: '' }, { name: '' }]
    }
  },
  computed: {
    ...mapGetters(['user']),
    isDisabled() {
      return this.$v.$invalid || this.options.length < 2
    }
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) return

      try {
        const res = await this.$apollo.mutate({
          mutation: createPoll,
          variables: {
            user: this.user,
            pollName: this.name,
            pollOptions: this.options
          }
        })

        if (!res.err) {
          this.$router.push(`/polls/${res.data.createPoll.id}`)
        }
      } catch (err) {
        this.errorMessage = 'Failed to create poll, please try again later'
      }
    },
    addOption() {
      this.options.push({ name: 'New Option' })
    },
    removeOption(option) {
      this.options.splice(option, 1)
    }
  },
  validations: {
    name: {
      required
    }
  }
}
</script>

<style scoped>

</style>
