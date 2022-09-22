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
                <el-menu>
                    <Menu 
                        v-for="(item, index) in routes[1].children"
                        :_item="item"
                        :_index="index.toString()"
                    />
                </el-menu>
            </div>
            <div class="my-center-container-right">
                <router-view></router-view>
                <!-- 这里是右边 -->
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" setup>
    import Report from './components/Report.vue';
    import Menu from './components/Menu.vue';
    import { routes } from '../../router/index'

</script>