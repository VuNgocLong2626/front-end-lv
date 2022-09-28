<template>
<b-button v-if="!link" :class="mode" variant="outline-dark" class="edit-button">
    <div class="center-text">
      <slot></slot>
    </div>
  </b-button>
  <router-link v-else :to="to" :class="mode" class="btn btn-outline-dark edit-button none-border">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
.edit-button {
  border: var(--bs-btn-border-width) solid #fff;
  color: #fff
}

.none-border {
  border: none;
}
</style>