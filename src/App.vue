<template>
  <the-header></the-header>
  <the-header-control></the-header-control>
  <router-view>
    
  </router-view>
</template>

<script>

import TheHeader from './components/layout/TheHeader.vue';
import TheHeaderControl from './components/layout/TheHeaderControl.vue';

export default {
  components: {
    TheHeader,
    TheHeaderControl
  }
}
</script>

<style>
    @import './css/style.css';
</style>
