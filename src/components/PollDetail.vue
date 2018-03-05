<template>
  <div class="is-centered">
    <h1 class="title">{{ poll.name }}</h1>
    <ul
      v-for="(option, index) in poll.pollOptions"
      :key="index"
    >
      <li>{{ option.name }}</li>
      <li>{{ option.votes }}</li>
    </ul>
  </div>
</template>

<script>
import getPoll from '@/graphql/getPoll'

export default {
  data() {
    return {
      poll: {},
      pollId: this.$route.params[0]
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
  }
}
</script>

<style scoped>

</style>
