import Home from '../../views/Home.vue'

export default [
    {
        path: '/',
        name: 'Home',
        cn: 'Home',
        meta: { // 是否使用 keep-alive
            keepAlive: true,
        },
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        cn: 'About',
        hidden: false,  // 是否隐藏在目录
        
        component: () => import('@/views/About.vue')
    }
]