<template>
  <div v-if="isPermission">
    <info-account></info-account>
  </div>
  <div v-else>
    <list-location></list-location>
  </div>
  <button @click="isTokenExpired">Ahihi</button>
</template>

<script>
import InfoAccount from "../Admin/InfoAccount.vue";
import ListLocation from "./ListLocation.vue";

export default {
  components: {
    InfoAccount,
    ListLocation,
  },
  computed: {
    isPermission() {
      return !!this.$store.getters["info/permission"];
    },
  },
  methods: {
    isTokenExpired() {
      const token = localStorage.getItem("AccessToken");
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const data = JSON.parse(jsonPayload);
      const expirationDate = data.exp;
      const currentDate = new Date().getTime() / 1000;
      console.log(currentDate >= expirationDate);
    },
  },
};
</script>