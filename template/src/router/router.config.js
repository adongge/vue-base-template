import Home from '../views/Home'
import Login from '@/components/Login'
import NotAuth from '@/components/NotAuth'

const config = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            // { path: '/user', name: 'user', component:User, meta:{ requireAuth: true, title:'参考' } }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: "/404",
        name: "notFound",
        component: NotAuth
    }, 
{
        path: "*",//最底部，确保所有路由都早不到时，跳转404
        redirect: "/404"
    }
]

export default config;
