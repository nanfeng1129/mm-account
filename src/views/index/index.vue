<template>
    <div class="index">

        <!-- <div class="index-logo">
            <LogoGithubIcon size="36px" class="index-logo-icon"/>
            
        </div> -->

        <div class="index-right">
            <div class="index-theme-switch">
                <div class="index-theme-switch-sun index-theme-switch-div" @click="changeThemeMode('light')">
                    <SunIcon width="20px" height="20px"/>
                </div>
                <div class="index-theme-switch-moon index-theme-switch-div" @click="changeThemeMode('dark')">
                    <MoonIcon width="20px" height="20px"/>
                </div>
                
            </div>

            <div class="index-login">
                <div>
                    <div v-if="!store.isLogin">
                        <el-icon size="36px" @click="login">
                            <User />
                        </el-icon>
                    </div>
                    <div v-else>
                        <el-dropdown>
                            <el-avatar :src="avatarSrc" fit="cover" />
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="jumpToMyCenter">个人中心</el-dropdown-item>
                                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <!-- <el-icon size="36px" @click="jumpToMyCenter" v-else>
                        <el-avatar :src="avatarSrc" fit="cover" />
                        <el-badge is-dot type="success">
                            <User />
                        </el-badge>
                    </el-icon> -->
                </div>
            </div>
        </div>
        
        <div class="index-left">
            <div class="index-left-sun" v-show="isLight">
                <SunIcon width="130px" height="130px" class="index-left-sun-icon"/>
            </div>
            <div class="index-left-moon" v-show="!isLight">
                <MoonIcon width="130px" height="130px" class="index-left-moon-icon"/>
            </div>
        </div>

        <div class="index-sunshine"></div>

        <div class="index-main">
            <div class="index-main-text animate__animated animate__bounce">
                <div class="index-main-text-header">Welcome To</div>
                <div class="index-main-text-body">mm 拾光小店</div>
            </div>
            
        </div>

        <el-dialog v-model="visible" title="登录" width="400px">
            <el-form 
                :model="formData" 
                ref="loginForm"
                label-width="80px"
                label-position="top"
                :rules="rules"
            >
                <el-form-item label="账号" prop="username">
                    <el-input v-model="formData.username" autocomplete="off" placeholder="请输入账号"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" autocomplete="off" placeholder="请输入密码" type="password" show-password />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" autocomplete="off" placeholder="请输入邮箱"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleReset(loginForm)">重置</el-button>
                    <el-button type="primary" @click="handleOk(loginForm, formData, onSubmit)">确认</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 这里是index
        <t-button @click="changeThemeMode">
            {{buttonText}}
        </t-button>
        <h1 class="animate__animated animate__bounce">An animated element</h1>
        <div style="height: 700px; width: 100%;">demo</div>
        <div style="position: relative;">
            <div data-aos="flip-left" style="width: 100%; text-align: center; height: 200px; background-color: aqua;">11111111111</div>
        </div> -->
        
    </div>
</template>

<script lang="ts" setup>
    import { nextTick, ref, onBeforeMount } from 'vue'
    import SunIcon from './conponents/SunIcon.vue'
    import MoonIcon from './conponents/MoonIcon.vue'
    import { useModal, useForm, useAvatar, useAfterLogin } from './store'
    import { User } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router'
    import { useLoginStore } from '@/stores/user'
    // const buttonText = ref('深色模式')

    onBeforeMount(() => {
        let theme = document.documentElement.getAttribute("theme-mode")
        if(theme === 'dark')
            isLight.value = false;
        else
            isLight.value = true;
    })

    // pinia
    const store = useLoginStore()

    // modal
    const { visible, handleOk, changeVisible } = useModal()

    // form
    const { formData, rules, loginForm, onSubmit, handleReset } = useForm()

    // avatar
    const { avatarSrc } = useAvatar()

    const login = () => {
        // router.push("/myCenter")
        if(!store.isLogin) {
            changeVisible(true)
            nextTick(() => {
                handleReset(loginForm.value)
            })
        }
    }

    // after login
    const { jumpToMyCenter, logout } = useAfterLogin()

    const isLight = ref(true)

    // const

    const changeThemeMode = (type: string) => {
        if(type === 'dark'){
            document.documentElement.setAttribute("theme-mode", 'dark')
            document.documentElement.className = 'dark'
            isLight.value = false
        }else {
            document.documentElement.setAttribute("theme-mode", 'light')
            document.documentElement.className = 'light'
            isLight.value = true
        }
    }

</script>