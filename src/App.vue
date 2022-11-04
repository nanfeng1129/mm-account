
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
  import { axiosPostJson } from './utlis/util'
  import { RESP_TYPE } from '@/constants/common'
  import { useLoginStore } from '@/stores/user'
  onMounted(() => {
    const store = useLoginStore()
    document.documentElement.setAttribute('theme-mode', 'light')
    document.documentElement.className = 'light'
    
    // 尝试 fetch 的写法，用 axios 会更加统一
    // fetch('/api/user/checkLogin', {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   mode:'cors',
    // }).then(res => {
    //   return res.json()
    // }).then(resp => {
    //   console.log("resp", resp)
    // })

    // 验证是否登录
    axiosPostJson('/user/checkLogin').then(res => {
      if (res.data?.code === RESP_TYPE.SUCCESS) {
        store.changeIsLogin(true)
      }
    })
  })

  const locale = zhCn
</script>
