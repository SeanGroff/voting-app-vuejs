<template>
  <div>
    <base-header>Polls</base-header>
    <ul v-if="polls">
      <li
        v-for="(poll, index) in polls"
        :key="index"
        class="box"
        @click="handleClick(poll)"
      >
        <span>{{ poll.name }}</span>
        <button
          :class="{ 'hide': poll.createdBy === username }"
          class="is-danger"
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
export default {
  components: {
    BaseHeader
  },
  data() {
    return {
      polls: []
    }
  },
  computed: {
    ...mapGetters(['isAuthorized', 'userId'])
  }
}
</script>

<style lang="scss" scoped>
li {
  position: relative;

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
