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
import getPoll from '@/graphql/getPoll'

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
  methods: {
    submitVote(id) {
      this.voteSubmitted = true
      console.log(id)
    },
    removeVote(id) {
      // this needs to only disable the voted on option
      this.voteSubmitted = false
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>
