<template>
  <div class="columns poll-detail">

    <div class="column is-flex header-wrapper">
      <h1 class="title is-1 has-text-grey-dark">{{ poll.name }}</h1>
      <h2
        v-if="poll && poll.createdBy && poll.createdBy.name"
        class="subtitle is-4 is-capitalized has-text-grey"
      >
        {{ `created by: ${poll.createdBy.name}` }}
      </h2>

      <div class="box poll-buttons">
        <social-sharing
          v-show="isAuthorized"
          :title="poll.name"
          class="text-center poll-button-spacing full-width-button"
          hashtags="freeCodeCamp, 100DaysOfCode, VueJS"
          twitter-user="_SeanGroff"
          inline-template
        >
          <button class="button is-link full-width-button">
            <network network="twitter">
              <i class="fab fa-twitter-square" />
              Share
            </network>
          </button>
        </social-sharing>

        <button
          v-show="isAuthorized"
          class="button is-success poll-button-spacing full-width-button"
          @click="isOpen = true"
        >
          Add New Option
        </button>

        <div
          v-if="poll && poll.createdBy && poll.createdBy.id"
          class="poll-button-spacing full-width-button"
        >
          <button
            v-show="isAuthorized && userId === poll.createdBy.id"
            class="button is-danger full-width-button"
            @click="deletePoll"
          >
            Delete Poll
          </button>
        </div>

      </div>
    </div>

    <div class="column text-center">
      <h2 class="title is-3 has-text-grey-dark is-center">Cast Your Vote</h2>
      <ul
        v-for="(option, index) in poll.pollOptions"
        :key="index"
      >
        <li class="title is-5 top-bottom-gutter">{{ option.name }}</li>
        <li class="title is-5 has-text-grey voting-buttons-row">
          <span>{{ option.votes }}</span>
          <button
            :disabled="Boolean(userVote.choice)"
            class="button is-primary voting-button"
            @click="submitVote(option.id)"
          >
            Vote
          </button>
          <button
            :disabled="userVote.choice !== option.id"
            class="button is-warning voting-button"
            @click="removeVote(option.id)"
          >
            Undo
          </button>
        </li>
      </ul>

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
    </div>

    <div class="column">
      <base-bar-chart
        :data="dataCollection"
        class="chart-wrapper"
      />
    </div>
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
          if (option.voters.find(voter => voter.ip === this.userIp)) {
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
    ...mapGetters(['userId', 'userIp', 'isAuthorized', 'userToken']),
    isDisabled() {
      return this.$v.$invalid
    }
  },
  async mounted() {
    try {
      await this.checkAuthorization(this.userToken)

      // get current users ip and set vuex userIp state
      await this.updateIpAddress()

      this.poll.pollOptions.forEach(option => {
        const voterIp = option.voters.find(voter => voter.ip === this.userIp)

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

<style lang="scss" scoped>
.poll-detail {
  padding: 24px;

  .header-wrapper {
    flex-direction: column;
  }

  .poll-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;

    .poll-button-spacing {
      margin: 8px 0;
    }

    .full-width-button {
      width: 100%;
    }
  }

  .voting-buttons-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .voting-button {
    margin: 0 8px;
  }

  .text-center {
    text-align: center;
  }

  .top-bottom-gutter {
    margin: 16px 0;
  }
}
</style>
