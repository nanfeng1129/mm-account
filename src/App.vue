
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  onMounted(() => {
    document.documentElement.setAttribute('theme-mode', 'light')
    document.documentElement.className = 'light'
  })
</script>
