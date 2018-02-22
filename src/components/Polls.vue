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
          class="is-danger"
          :class="{ 'hide': poll.createdBy === username }"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader'
export default {
  components: {
    BaseHeader
  },
  data() {
    return {
      polls: []
    }
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
