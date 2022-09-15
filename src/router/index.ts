import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import("@/views/index/index.vue"),
        meta: {
            title: '首页',
        }
    },
    {
        path: '/myCenter',
        component: () => import("@/views/my-center/index.vue"),
        meta: {
            title: '个人中心',
        }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

router.afterEach((to) => {
    document.title = (to.meta?.title ?? '找不到') as string
})

export default router