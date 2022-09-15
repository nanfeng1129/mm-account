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
                    <el-icon size="36px" @click="login">
                        <User />
                    </el-icon>
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

        <div class="index-sunshine" v-show="isLight"></div>

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
                <el-form-item label="账号" prop="userName">
                    <el-input v-model="formData.userName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" autocomplete="off" />
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
    import { nextTick, ref } from 'vue'
    import SunIcon from './conponents/SunIcon.vue'
    import MoonIcon from './conponents/MoonIcon.vue'
    import { useModal, useForm } from './store'
    import { User } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router'
    // const buttonText = ref('深色模式')

    const router = useRouter()

    const { visible, handleOk, changeVisible } = useModal()

    const { formData, rules, loginForm, onSubmit, handleReset } = useForm()

    const login = () => {
        router.push("/myCenter")
        // changeVisible(true)
        // nextTick(() => {
        //     handleReset(loginForm.value)
        // })
    }

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