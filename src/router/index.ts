import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

export const routes: RouteRecordRaw[] = [
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
        },
        redirect: '/myCenter/consumptionList',
        children: [
            {
                path: 'consumptionList',
                component: () => import("@/views/consumption-list/consumptionList.vue"),
                meta: {
                    title: '消费列表',
                    parent: '/myCenter'
                },
                // children: [
                //     {
                //         path: 'consumptionList',
                //         component: () => import("@/views/consumption-list/consumptionList.vue"),
                //         meta: {
                //             title: '消费列表',
                //             parent: '/myCenter/consumptionList'
                //         },
                //     },
                //     {
                //         path: 'consumptionList',
                //         component: () => import("@/views/consumption-list/consumptionList.vue"),
                //         meta: {
                //             title: '消费列表',
                //             parent: '/myCenter/consumptionList'
                //         },
                //     }
                // ]
            },
        ]
    }
]

// 后续动态添加这段路由
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/myCenter',
        component: () => import("@/views/my-center/index.vue"),
        meta: {
            title: '个人中心',
        },
        children: [
            {
                path: 'consumptionList',
                component: () => import("@/views/consumption-list/consumptionList.vue"),
                meta: {
                    title: '消费列表',
                },
            }
        ]
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