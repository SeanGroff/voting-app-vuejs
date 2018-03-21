<template>
  <div>
    <base-header>Polls</base-header>
    <base-polls-list :polls="polls" />
  </div>
</template>

<script>
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
  }
}
</script>
