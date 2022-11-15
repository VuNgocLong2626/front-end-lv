<template>
    <h1>Trang Chính</h1>
</template>

<script>
export default {
  computed: {
    isPermission() {
      return !!this.$store.getters["info/permission"];
    },
  },
  methods: {

  },
};
</script>