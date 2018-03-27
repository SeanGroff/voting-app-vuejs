<template>
  <ul v-if="polls">
    <li
      v-for="(poll, index) in polls"
      :key="index"
      class="box"
      @click="$router.push(`/polls/${poll.id}`)"
    >
      <transition name="fade">
        <span>{{ poll.name }}</span>
      </transition>
      <button
        v-show="isAuthorized && poll.createdBy.id === userId"
        class="delete"
        @click.stop="$emit('delete', poll)"
      />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    polls: {
      type: Array,
      default: function() {
        return []
      }
    },
    userId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthorized'])
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
