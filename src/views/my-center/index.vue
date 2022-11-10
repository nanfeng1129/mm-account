<template>
    <div class="my-center">
        <div class="my-center-header">
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <Report :title="`昨日消费总额${item}`"/>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="my-center-container">
            <div class="my-center-container-left">
                <el-menu class="my-center-container-left-menu" :default-active="defaultVal">
                    <Menu 
                        v-for="item in routes[1].children"
                        :_item="item"
                        :_index="`${item.meta?.parent ?? ''}${item.path}`"
                    />
                </el-menu>
            </div>
            <div class="my-center-container-right">
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" setup>
    import Report from './components/Report.vue'
    import Menu from './components/Menu.vue'
    import { routes } from '../../router/index'
    import { ref, watch } from 'vue'
    import { useRoute, RouteRecordRaw } from 'vue-router'

    // route
    const route = useRoute()

    const defaultVal = ref('2')

    const callback = (arr: RouteRecordRaw[] | undefined) => {
        arr?.map?.(item => {
            let parentPath = (item.meta?.parent ?? '') as string
            let pathHead = item.path.indexOf('/') === 0 ? '' : '/'
            if (parentPath && route.path === `${parentPath}${pathHead}${item.path}`) {
                defaultVal.value = parentPath + item.path
            } else if (route.path === item.path){
                defaultVal.value = item.path
            } else if (item.children) {
                callback(item.children)
            }
        })
    }

    watch(() => route.path, () => {
        callback(routes[1].children)
    }, {
        immediate: true
    })

    


</script>