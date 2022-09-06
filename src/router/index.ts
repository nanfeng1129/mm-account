import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import("@/views/index/index.vue"),
        meta: {
            title: '首页',
        }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router