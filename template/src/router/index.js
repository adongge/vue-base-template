import Vue from 'vue'
import VueRouter from 'vue-router'
import common from '@/util/common'
import store from "@/store"
import routerGroup from './router.config'

Vue.use(VueRouter)

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes: (() => routerGroup)()
})

if (common.getCookie('_KEYDATA')) {
    store.commit('setToken', common.getCookie('_KEYDATA'))
}
const defaultTitle = '首页'
// 利用vue-router提供的钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
    if (to.path != '/login' && to.path != '/notauth') {
        if (store.state.user.urls.length > 0 && !common.inArray(to.path, store.state.user.urls)) {
            next({ path: '/notauth', query: { redirect: to.fullPath } })
        } else {
            common.setCookie('_LASTPATH', to.path, 'd30');
        }
    }
    document.title = to.meta.title ? to.meta.title : defaultTitle
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        // 通过vuex state获取当前的token是否存在
        if (store.state.user.token) {
            next();
        } else {
            //next();
            next({ path: '/login', query: { redirect: to.fullPath } })
        }
    } else {
        next();
    }
});

export default router
