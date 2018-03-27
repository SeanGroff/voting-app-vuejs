<template>
  <div>
    <base-header>Polls</base-header>
    <base-polls-list
      :polls="polls"
      :user-id="userId"
      @showModal="showModal($event)"
      @delete="handleDeleteClick($event)"
    />
    <base-modal
      :is-active="isActive"
      text="Are you sure you want to permanently delete this poll?"
      @deletePoll="deletePoll"
      @showModal="showModal($event)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseHeader from '@/components/BaseHeader'
import BasePollsList from '@/components/BasePollsList'
import BaseModal from '@/components/BaseModal'
import getPolls from '@/graphql/getPolls'
import deletePoll from '@/graphql/deletePoll'

export default {
  components: {
    BaseHeader,
    BasePollsList,
    BaseModal
  },
  data() {
    return {
      polls: [],
      pollSelected: null,
      isActive: false
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
    showModal(isActive) {
      this.isActive = isActive
    },
    handleDeleteClick(poll) {
      this.pollSelected = poll
      this.isActive = true
    },
    async deletePoll() {
      try {
        await this.$apollo.mutate({
          mutation: deletePoll,
          variables: {
            pollId: this.pollSelected.id
          },
          update: (store, { data: { removePoll } }) => {
            const data = store.readQuery({ query: getPolls })

            data.polls = data.polls.filter(
              poll => poll.id !== this.pollSelected.id
            )

            store.writeQuery({ query: getPolls, data })
          }
        })

        this.pollSelected = null
        this.isActive = false
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
