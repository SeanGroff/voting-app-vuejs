<template>
  <div
    :class="{ 'is-active': isActive }"
    class="modal"
  >
    <div class="modal-background" />
    <div class="modal-content">
      <form @submit.prevent="handleButtonClick">
        <div class="field">
          <p>{{ text }}</p>
          <button
            class="button is-success is-large"
            aria-label="submit"
            type="submit"
          >
            Yes
          </button>
        </div>
      </form>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="handleCloseClick" />
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    handleButtonClick: {
      type: Function,
      default: function() {
        return {}
      }
    },
    handleCloseClick: {
      type: Function,
      default: function() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
