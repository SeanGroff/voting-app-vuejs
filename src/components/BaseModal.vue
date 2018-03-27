<template>
  <div
    :class="{ 'is-active': isActive }"
    class="modal"
  >
    <div class="modal-background" />
    <div class="modal-content">
      <div class="field has-text-centered">
        <p class="has-text-white has-text-weight-semibold text-margin">{{ text }}</p>
        <button
          class="button is-danger is-large"
          aria-label="submit"
          type="button"
          @click="$emit('deletePoll')"
        >
          Delete
        </button>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="$emit('showModal', false)" />
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
    }
  }
}
</script>

<style lang="scss" scoped>
.text-margin {
  margin-bottom: 16px;
}
</style>
