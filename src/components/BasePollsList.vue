<template>
  <ul v-if="polls">
    <li
      v-for="(poll, index) in polls"
      :key="index"
      class="box"
      @click="$router.push(`/polls/${poll.id}`)"
    >
      <span>{{ poll.name }}</span>
      <button
        v-show="poll.createdBy.ip === userIp"
        class="delete is-danger"
      >
        Delete
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    polls: {
      type: Array,
      default: function() {
        return []
      }
    },
    userIp: {
      type: String,
      default: ''
    }
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
