import Home from '../views/Home'
import Login from '@/components/Login'
import NotAuth from '@/components/NotAuth'
import HelloWorld from '@/components/HelloWorld'


const config = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            // { path: '/user', name: 'user', component:User, meta:{ requireAuth: true, title:'参考' } },
            { path: '/helloworld', name: 'helloworld', component:HelloWorld, meta:{ title:'参考' } }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
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
