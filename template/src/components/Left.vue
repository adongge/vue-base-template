<template>
    <div :class="'left'+(isCollapse?' left-collapse':'')">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
        </div>
        <el-menu
        :default-active="active"
        class="el-menu-vertical"
        @select="select"
        :collapse="isCollapse"
        :router="true"
        >
            <template v-for="(item, index) in menus">
                <el-submenu v-if="item.children && item.children.length>0" :key="index" :index="'menu-'+index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="(children, sub) in item.children" :key="sub" :index="children.value">
                        <span slot="title">{{children.name}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else  :index="item.value" :key="index">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
import api from '../util/api';
import common from "@/util/common";
export default {
    name: 'Left',
    props:{
        isCollapse: Boolean
    },
    data() {
        return {
            menus:[
                {
                    name: '参考',
                    value: '/',
                    icon: 'el-icon-info',
                },
                {
                    name: '菜单',
                    value: '/home',
                    icon: 'el-icon-menu',
                    children: [
                        {
                            name: 'hello',
                            value: '/helloworld'
                        },{
                            name: 'about',
                            value: '/about'
                        }
                    ]
                },
                {
                    name: '登录',
                    value: '/login',
                    icon: 'el-icon-user'
                }
            ],
            active: '/reference'
        };
    },
    mounted(){
        this.active = common.getCookie('_LASTPATH')
        this.init()
    },
    methods: {
        init(){
            api.adminMenu().then((res) => {
                this.menus = res.data.menus
            })
        },
        select(index,indexPath){
            this.active = index;
        }
    }
}
</script>
<style scoped lang="less">
.left,
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 600px;
    float: left;
}
.el-menu{border-right:0 !important;}
.el-menu--collapse{
    float: left;
}
.left-collapse{
    width: 65px;
}
.left{border-right:1px solid #e8e8e8;}
.left .logo{
    height: 55px;
    text-align: center;
    font-size: 20px;
    border-bottom: 1px solid #e8e8e8;
    img{
        margin-top: 15px;
        height: 30px;
    }
}
</style>
