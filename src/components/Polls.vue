<template>
  <div>
    <base-header>Polls</base-header>
    <ul v-if="polls">
      <li
        v-for="(poll, index) in polls"
        :key="index"
        class="box"
        @click="$router.push(`/polls/${poll.id}`)"
      >
        <span>{{ poll.name }}</span>
        <button
          v-show="poll.createdBy === username"
          class="delete is-danger"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseHeader from '@/components/BaseHeader'
import getPolls from '@/graphql/getPolls'

export default {
  components: {
    BaseHeader
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
    ...mapGetters(['isAuthorized', 'userId', 'username'])
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 300px;

  &:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  &:active {
    bottom: -5px;
    cursor: pointer;
  }
}
</style>
