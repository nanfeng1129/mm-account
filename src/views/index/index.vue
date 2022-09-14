<template>
    <div>

        <!-- <div class="index-logo">
            <LogoGithubIcon size="36px" class="index-logo-icon"/>
            
        </div> -->

        <div class="index-right">
            <div class="index-theme-switch">
                <div class="index-theme-switch-sun index-theme-switch-div" @click="changeThemeMode('light')">
                    <SunIcon :width="20" :height="20"/>
                </div>
                <div class="index-theme-switch-moon index-theme-switch-div" @click="changeThemeMode('dark')">
                    <MoonIcon :width="20" :height="20"/>
                </div>
                
            </div>

            <div class="index-login">
                <div>
                    <el-icon size="36px" @click="login">
                        <User />
                    </el-icon>
                    <!-- <UserIcon size="36px" @click="login"/> -->
                    <!-- <UserCircleIcon size="36px" @click=""/> -->
                </div>
            </div>
        </div>

        <el-button>
            差不过事
        </el-button>
        
        <!-- <div>
            <div>
                <SunIcon />
            </div>
            <div>
                <MoonIcon />
            </div>
        </div> -->

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
                    <el-button type="primary" @click="handleOk(loginForm, formData, onSubmit, 'lijw', '000000')">确认</el-button>
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
    import { nextTick } from 'vue'
    import SunIcon from './conponents/SunIcon.vue'
    import MoonIcon from './conponents/MoonIcon.vue'
    import { useModal, useForm } from './store'
    import { User } from '@element-plus/icons-vue'
    // const buttonText = ref('深色模式')

    const { visible, handleOk } = useModal()

    const { formData, rules, loginForm, onSubmit, handleReset } = useForm()

    const login = () => {
        visible.value = true
        nextTick(() => {
            handleReset(loginForm.value)
        })
    }

    // const

    const changeThemeMode = (type: string) => {
        if(type === 'dark'){
            document.documentElement.setAttribute("theme-mode", 'dark')
            document.documentElement.className = 'dark'
        }else {
            document.documentElement.setAttribute("theme-mode", 'light')
            document.documentElement.className = 'light'
        }
    }

</script>