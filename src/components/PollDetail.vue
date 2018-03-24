<template>
  <div class="is-centered">
    <h1 class="title">{{ poll.name }}</h1>

    <social-sharing
      v-show="isAuthorized()"
      :title="poll.name"
      hashtags="freeCodeCamp, 100DaysOfCode, VueJS"
      twitter-user="_SeanGroff"
      inline-template
    >
      <button class="button is-link is-small">
        <network network="twitter">
          <i class="fab fa-twitter-square" />
          Share
        </network>
      </button>
    </social-sharing>

    <ul
      v-for="(option, index) in poll.pollOptions"
      :key="index"
    >
      <li>{{ option.name }}</li>
      <li>
        {{ option.votes }}
        <button
          :disabled="Boolean(userVote.choice)"
          class="button is-info"
          @click="submitVote(option.id)"
        >
          Vote
        </button>
        <button
          :disabled="userVote.choice !== option.id"
          class="button is-warning"
          @click="removeVote(option.id)"
        >
          Undo
        </button>
      </li>
    </ul>
    <div>
      <button
        v-show="isAuthorized()"
        class="button is-success"
        @click="isOpen = true"
      >
        Add New Option
      </button>
    </div>

    <div v-if="poll && poll.createdBy && poll.createdBy.id">
      <button
        v-show="isAuthorized && userId() === poll.createdBy.id"
        class="button is-danger"
        @click="deletePoll"
      >
        Delete Poll
      </button>
    </div>

    <p
      v-show="error"
      class="help is-danger"
    >
      <i class="fas fa-exclamation-triangle" />
      {{ error }}
    </p>

    <div
      :class="{ 'is-active': isOpen }"
      class="modal"
    >
      <div class="modal-background" />
      <div class="modal-content">
        <form @submit.prevent="addNewOption">
          <div class="field">
            <label
              class="label"
              for="newOption">
              New Option
            </label>
            <div class="control has-icons-left">
              <input
                v-model="newOption"
                :class="{ 'is-danger': $v.newOption.$error }"
                class="input"
                placeholder="New voting option"
                type="text"
                autofocus
                @input="$v.newOption.$touch"
              >
              <span class="icon is-small is-left">
                <i class="fas fa-plus" />
              </span>
            </div>
            <div v-show="$v.newOption.$error">
              <p
                v-show="!$v.newOption.required"
                class="help is-danger"
              >
                <i class="fas fa-exclamation-triangle" />
                {{ 'New option required' }}
              </p>
            </div>
          </div>
          <button
            :disabled="isDisabled"
            class="button is-success is-large"
            aria-label="add"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="isOpen = false"
      />
    </div>
    <base-bar-chart :data="dataCollection" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import BaseBarChart from '@/components/BaseBarChart'
import getPoll from '@/graphql/getPoll'
import submitVote from '@/graphql/submitVote'
import undoVote from '@/graphql/undoVote'
import addOption from '@/graphql/addOption'
import deletePoll from '@/graphql/deletePoll'
import getPolls from '@/graphql/getPolls'

export default {
  components: {
    BaseBarChart
  },
  data() {
    return {
      dataCollection: {},
      error: '',
      isOpen: false,
      newOption: '',
      poll: {},
      pollId: this.$route.params[0],
      userVote: {
        choice: ''
      }
    }
  },
  validations: {
    newOption: {
      required
    }
  },
  apollo: {
    poll: {
      query: getPoll,
      variables() {
        return {
          pid: this.pollId
        }
      },
      result({ data }) {
        this.userVote = data.poll.pollOptions.reduce((accum, option, index) => {
          if (option.voters.find(voter => voter.ip === this.userIp())) {
            return {
              choice: option && option.id ? option.id : ''
            }
          }
          return accum
        }, {})

        this.fillData()
      }
    }
  },
  computed: {
    isDisabled() {
      return this.$v.$invalid
    }
  },
  async mounted() {
    try {
      const token = this.userToken()
      await this.checkAuthorization(token)

      // get current users ip and set vuex userIp state
      await this.updateIpAddress()

      this.poll.pollOptions.forEach(option => {
        const voterIp = option.voters.find(voter => voter.ip === this.userIp())

        if (voterIp) {
          this.userVote.choice = option.id
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    ...mapActions(['checkAuthorization', 'updateIpAddress']),
    ...mapGetters(['userId', 'userIp', 'isAuthorized', 'userToken']),
    async submitVote(id) {
      try {
        await this.$apollo.mutate({
          mutation: submitVote,
          variables: {
            pollId: this.pollId,
            pollOption: {
              id
            }
          }
        })

        this.userVote = {
          choice: id
        }
      } catch (err) {
        console.log(err)
      }
    },
    async removeVote(id) {
      try {
        await this.$apollo.mutate({
          mutation: undoVote,
          variables: {
            pollId: this.pollId,
            pollOption: {
              id
            }
          }
        })

        this.userVote.choice = ''
      } catch (err) {
        console.log(err)
      }
    },
    async addNewOption() {
      try {
        await this.$apollo.mutate({
          mutation: addOption,
          variables: {
            pollId: this.pollId,
            optionName: this.newOption
          }
        })

        this.newOption = ''
        this.$v.$reset()
        this.isOpen = false
      } catch (err) {
        console.log(err)
      }
    },
    async deletePoll() {
      try {
        await this.$apollo.mutate({
          mutation: deletePoll,
          variables: {
            pollId: this.pollId
          },
          update: (store, { data: { removePoll } }) => {
            const data = store.readQuery({ query: getPolls })

            data.polls = data.polls.filter(poll => poll.id !== this.pollId)

            store.writeQuery({ query: getPolls, data })

            this.$router.push('/')
          }
        })
      } catch (err) {
        this.error = 'Not Authenticated. Redirecting to login...'
        setTimeout(() => {
          this.$router.replace('/login')
        }, 3000)
      }
    },
    fillData() {
      this.dataCollection = {
        labels: this.poll.pollOptions.map(option => option.name),
        datasets: [
          {
            label: this.poll.name,
            backgroundColor: '#ff3860',
            data: this.poll.pollOptions.map(option => option.votes)
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
