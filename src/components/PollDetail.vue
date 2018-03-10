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
          :disabled="voteSubmitted"
          class="button is-info"
          @click="submitVote(option.id)"
        >
          Vote
        </button>
        <button
          :disabled="!voteSubmitted"
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
      voteSubmitted: false
    }
  },
  apollo: {
    poll: {
      query: getPoll,
      variables() {
        return {
          pid: this.pollId
        }
      }
    }
  },
  updated() {
    this.voteSubmitted = this.poll.pollOptions.reduce((accum, option) => {
      if (option.voters.find(voter => voter.id === this.userId())) return true
      return accum
    }, false)
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

        this.voteSubmitted = true
      } catch (err) {
        console.log(err)
      }
    },
    removeVote(id) {
      // this needs to only disable the voted on option
      this.voteSubmitted = false
    }
  }
}
</script>

<style scoped>

</style>
