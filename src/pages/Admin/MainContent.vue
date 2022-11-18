<template>
  <b-row>
    <b-col cols="2">
      <b-button-group vertical>
        <base-button
          size="lg"
          :class="{ active: isAction === 'TrangCaNhan' }"
          block
          variant="dark"
          @click="getInfo"
          >Thông tin tài khoản</base-button
        >
        <base-button
          v-if="isPermission"
          size="lg"
          :class="{ active: isAction === 'TaoTaiKhoan' }"
          block
          variant="dark"
          @click="getCreateAccount"
          >Tạo Tài khoản</base-button
        >
        <base-button
          size="lg"
          :class="{ active: isAction === 'DiaDiem' }"
          block
          variant="dark"
          @click="getLocatin"
          >Quản lý địa điểm</base-button
        >
        <base-button
          size="lg"
          :class="{ active: isAction === 'BinhLuan' }"
          block
          variant="dark"
          @click="getComment"
          >Quản lý Bình Luận</base-button
        >
        <base-button
          v-if="isPermission"
          size="lg"
          :class="{ active: isAction === 'TaiKhoan' }"
          block
          variant="dark"
          @click="getAccount"
          >Quản lý Tài khoản</base-button
        >
      </b-button-group>
    </b-col>
    <b-col cols="10">
      <router-view></router-view>
    </b-col>
  </b-row>
</template>

 
<script>
import BaseButton from "@/components/ui/BaseButton.vue";
export default {
  components: { BaseButton },

  data() {
    return {
      isAction: null,
    };
  },
  computed: {
    isPermission() {
      return this.$store.getters["info/permission"] === "Admin";
    },
  },
  methods: {
    getInfo() {
      this.isAction = "TrangCaNhan";
      this.$router.push("home");
    },
    getLocatin() {
      this.isAction = "DiaDiem";
      this.$router.push("manage-location");
    },
    getComment() {
      this.isAction = "BinhLuan";
      this.$router.push("manage-comments");
    },
    getAccount() {
      this.isAction = "TaiKhoan";
      this.$router.push("manage-comments");
    },
    getCreateAccount() {
      this.isAction = "TaoTaiKhoan";
      this.$router.push("create-account");
    },
  },
};
</script>

<style scoped>
.active {
  opacity: 0.5;
}
</style>