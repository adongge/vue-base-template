<template>
    <div :class="'left'+(isCollapse?' left-collapse':'')">
        <div class="logo"> LOGO </div>
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
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <el-menu-item v-for="(children, sub) in item.children" :key="sub" :index="children.index">
                        <span slot="title">{{children.title}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="index" :index="item.index">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: 'Left',
    props:{
        isCollapse: Boolean
    },
    data() {
        return {
            menus:[
                {
                    title: '参考',
                    index: '/',
                    icon: 'el-icon-info',
                },
                {
                    title: '菜单',
                    index: '/home',
                    icon: 'el-icon-menu',
                    children: [
                        {
                            title: '子菜单',
                            index: '/reference'
                        }
                    ]
                },
                {
                    title: '登录',
                    index: '/login',
                    icon: 'el-icon-user'
                }
            ],
            active: '/reference'
        };
    },
    mounted(){
        this.active = this.$route.path;
    },
    methods: {
        select(index,indexPath){
            this.active = index;
        }
    }
}
</script>
<style scoped>
.left,
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
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
    line-height: 55px;
    text-align: center;
    font-size: 20px;
    border-bottom: 1px solid #e8e8e8;
}
</style>
