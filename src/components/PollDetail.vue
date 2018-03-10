<template>
  <div class="is-centered">
    <h1 class="title">{{ poll.name }}</h1>
    <ul
      v-for="(option, index) in poll.pollOptions"
      :key="index"
    >
      <li>{{ option.name }}</li>
      <li>
        {{ option.votes }}
        <button
          :disabled="!!userVote.voter"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import getPoll from '@/graphql/getPoll'
import submitVote from '@/graphql/submitVote'

export default {
  data() {
    return {
      poll: {},
      pollId: this.$route.params[0],
      userVote: {
        voter: '',
        choice: ''
      }
      // voteSubmitted: false
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
          if (option.voters.find(voter => voter.id === this.userId())) {
            return {
              voter: option.voters[index].id,
              choice: option.id
            }
          }
          return accum
        }, {})
      }
    }
  },
  methods: {
    ...mapGetters(['userId']),
    async submitVote(id) {
      try {
        this.$apollo.mutate({
          mutation: submitVote,
          variables: {
            pollId: this.pollId,
            pollOption: {
              id,
              voter: {
                id: this.userId()
              }
            }
          }
        })

        this.userVote = {
          voter: this.userId(),
          choice: id
        }
      } catch (err) {
        console.log(err)
      }
    },
    removeVote(id) {
      // @to-do Mutation to remove vote from Mongo
      this.userVote = {
        voter: '',
        choice: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
