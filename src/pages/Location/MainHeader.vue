<template>
    <the-header></the-header>
    <the-header-control v-show="!isBussiness"></the-header-control>
    <div style="margin-top: 20px;" v-show="isBussiness">
        <main-content></main-content>
    </div>
</template>

<script>
import TheHeader from '../../components/layout/TheHeader.vue';
import TheHeaderControl from '../../components/layout/TheHeaderControl.vue';
import MainContent from '../Admin/MainContent.vue';

export default {
  components: {
    TheHeader,
    TheHeaderControl,
    MainContent
  },
  computed: {
    isBussiness() {
      return !!this.$store.getters["info/permission"];
    }
  }
}
</script>