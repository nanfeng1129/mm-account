<template>
    <div>

        <div class="index-logo">
            <LogoGithubIcon size="36px" class="index-logo-icon"/>
            
        </div>
        <div class="index-theme-switch">
            <div class="index-theme-switch-sun index-theme-switch-div" @click="changeThemeMode('light')">
                <SunIcon />
            </div>
            <div class="index-theme-switch-moon index-theme-switch-div" @click="changeThemeMode('dark')">
                <MoonIcon />
            </div>
        </div>
        
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
    import { ref } from 'vue'
    import { LogoGithubIcon } from 'tdesign-icons-vue-next'
    import SunIcon from './conponents/SunIcon.vue'
    import MoonIcon from './conponents/MoonIcon.vue'

    // const buttonText = ref('深色模式')

    const changeThemeMode = (type: string) => {
        if(type === 'dark'){
            document.documentElement.setAttribute("theme-mode", 'dark')
        }else {
            document.documentElement.setAttribute("theme-mode", 'light')
        }
    }

</script>