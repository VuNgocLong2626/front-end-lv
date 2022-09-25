<template>
  <button v-if="!link" :class="mode" class="btn btn-outline-dark edit-button">
    <div class="center-text">
      <slot></slot>
    </div>
  </button>
  <router-link v-else :to="to" :class="mode" class="btn btn-outline-dark edit-button">
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
/* button,
a {
  text-decoration: none;
  font: inherit;
  background-color: #73bd24;
  color: white;
  cursor: pointer;
  width: 80px;
}

a:hover,
a:active,
button:hover,
button:active {
  background: #000;
  line-height: 2rem;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
} */
</style>