import Home from '../views/Home'
import Login from '@/components/Login'
import NotAuth from '@/components/NotAuth'
import HelloWorld from '@/components/HelloWorld'
import Reference from '@/components/Reference'

import Admin from '@/views/admin/Admin'
import Role from '@/views/admin/Role'

const config = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            { path: '/helloworld', name: 'helloworld', component:HelloWorld, meta:{ title:'首页' } },
            { path: '/reference', name: 'reference', component:Reference, meta:{ title:'参考' } },
            { path: '/admin/admin', name: 'admin', component:Admin, meta:{ title:'管理员' } },
            { path: '/admin/role', name: 'role', component:Role, meta:{ title:'角色' } },
            { path: '/admin/logs', name: 'logs', component:Logs, meta:{ title:'日志' } }
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
