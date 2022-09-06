
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  onMounted(() => {
    document.documentElement.setAttribute('theme-mode', 'light');
  })
</script>
