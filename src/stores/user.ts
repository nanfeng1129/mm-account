import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useLoginStore = defineStore('login', () => {
    const isLogin = ref(false)

    const changeIsLogin = (boo: boolean) => {
        isLogin.value = boo
    }
    return { isLogin, changeIsLogin }
})

export const userStore = useLoginStore()