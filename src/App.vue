<template>
  <main-header v-if="!isShow"></main-header>
  <div v-show="!isPermission">
    <router-view></router-view>
  </div>
  <the-footer v-if="!isUrl"></the-footer>
</template>

<script>
import MainHeader from "./pages/Location/MainHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue"

export default {
  components: {
    MainHeader,
    TheFooter
  },
  computed: {
    isPermission() {
      return !!this.$store.getters["info/permission"];
    },
    isUrl() {
      const path = this.$router.currentRoute.value.path;
      return path.split('/')[1] === 'admin';
    },
    isLoginAdmin() {
      const path = this.$router.currentRoute.value.path;
      return path.split('/')[2] === 'login';
    },
    isShow() {
      return this.isUrl && this.isLoginAdmin;
    }
  },
};
</script>

<style>
@import "./css/style.css";
</style>
