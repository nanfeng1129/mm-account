
<template>
  <div>
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  onMounted(() => {
    document.documentElement.setAttribute('theme-mode', 'light')
    document.documentElement.className = 'light'
  })
  const locale = zhCn
</script>
