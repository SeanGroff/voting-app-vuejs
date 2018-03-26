<template>
  <div>
    <base-header>My Polls</base-header>
    <base-polls-list
      :polls="polls"
      :user-id="userId"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseHeader from '@/components/BaseHeader'
import BasePollsList from '@/components/BasePollsList'
import getPolls from '@/graphql/getPolls'

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
      query: getPolls,
      variables: {
        uid: this.userId
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthorized', 'userId', 'userIp', 'userToken'])
  },
  async mounted() {
    const token = this.userToken

    const { error } = await this.checkAuthorization(token)

    error
      ? this.$router.replace('/login')
      : this.$apollo.queries.polls.refetch({ uid: this.userId })
  },
  methods: {
    ...mapActions(['checkAuthorization'])
  }
}
</script>

<style scoped>

</style>
