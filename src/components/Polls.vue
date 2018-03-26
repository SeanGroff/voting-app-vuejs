<template>
  <div>
    <base-header>Polls</base-header>
    <base-polls-list
      :polls="polls"
      :user-id="userId"
      :handle-delete-click="deletePoll"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseHeader from '@/components/BaseHeader'
import BasePollsList from '@/components/BasePollsList'
import getPolls from '@/graphql/getPolls'
import deletePoll from '@/graphql/deletePoll'

export default {
  components: {
    BaseHeader,
    BasePollsList
  },
  data() {
    return {
      polls: []
    }
  },
  apollo: {
    polls: {
      query: getPolls
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  methods: {
    async deletePoll(pollId) {
      try {
        await this.$apollo.mutate({
          mutation: deletePoll,
          variables: {
            pollId
          },
          update: (store, { data: { removePoll } }) => {
            const data = store.readQuery({ query: getPolls })

            data.polls = data.polls.filter(poll => poll.id !== pollId)

            store.writeQuery({ query: getPolls, data })
          }
        })
      } catch (err) {
        this.error = 'Not Authenticated. Redirecting to login...'
        setTimeout(() => {
          this.$router.replace('/login')
        }, 3000)
      }
    }
  }
}
</script>
