<template>
  <div>
    <base-header>Polls</base-header>
    <base-polls-list
      :polls="polls"
      :user-ip="userIp"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      query: getPolls
    }
  },
  computed: {
    ...mapGetters(['userIp'])
  }
}
</script>
