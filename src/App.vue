<template>
  <main-header></main-header>
  <div v-show="!isPermission">
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from "./pages/Location/MainHeader.vue";

export default {
  components: {
    MainHeader,
  },
  computed: {
    isPermission() {
      return !!this.$store.getters["info/permission"];
    },
  },
};
</script>

<style>
@import "./css/style.css";
</style>
