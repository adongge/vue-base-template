<template>
    <div class="home">
        <left :isCollapse="isCollapse"></left>
        <div :class="'right'+(isCollapse?' right-collapse':'')">
            <div class="top text-primary">
                <div class="icon">
                    <span class="btn-collapse" @click="collapse">
                        <i :class="(isCollapse?'el-icon-tickets':'el-icon-notebook-2')"></i>
                    </span>
                    {{ $route.meta.title }}
                </div>
                <div class="info">
                    <span class="btn-user" @mousemove="act(true)" @mouseout="act(false)">
                        <i class="el-icon-user-solid"></i>
                        <div id="_act-menu" class="act-menu" v-show="showAct" >
                            <div @click="logout"><i class="el-icon-caret-right"></i>退出登录</div>
                        </div>
                    </span>
                </div>
                <div class="fixclear"></div>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import common from "@/util/common";
import {mapMutations} from 'vuex';
import Left from '@/components/Left.vue';
export default {
    name: "Home",
    components: {Left},
    data() {
        return {
            isCollapse: false,
            showAct: false,
        };
    },
    methods: {
        ...mapMutations({
            setToken: 'setToken'
        }),
        act(show){
            this.showAct = show;
        },
        collapse(){
            this.isCollapse = !this.isCollapse;
        },
        logout() {
            this.$confirm('确认要退出吗？', '提示',common.cfmcfg).then(() => {
                common.delCookie(common.dataKey);
                this.setToken(false);
                window.location.href = '/index.html/#/login';
            }).catch((err) => {
                console.log(err);
                return Promise.resolve(err)
            });
        },
    }
};
</script>
<style>
.right {
    margin-left: 200px;
    min-width: 1000px;
    padding:5px;
}
.right-collapse{
    margin-left: 65px;
}
.right .content{
    height: 100%;
    overflow: auto;
    padding: 10px;
}
.right .btn-collapse{
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    background: #e8e8e8;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    display: inline-block;
    margin-left: 5px;
    margin-right: 20px;
}
.right .btn-user{
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    background: #e8e8e8;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    display: inline-block;
    margin-left: 5px;
}
.right .act-menu {
    position: fixed;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-size: 12px;
    top: 35px;
    right: 10px;
    z-index: 500;
    text-align: center;
    animation: actY 0.4s;
}
@keyframes actY {
    from {margin-top:10px; opacity:0;} to {margin-top:0; opacity:1;}
}
.right .act-menu div {
    padding: 10px;
    cursor: pointer;
    min-width: 100px;
    margin: 10px;
    transition:all .3s,border 0s;
}
.right .act-menu i {
    font-size:12px;
}

.right .act-menu div:hover {
    background: #e6f7ff;
}
.right .top{
    padding: 10px;
    height: 30px;
    box-shadow: 0 4px 4px -4px rgba(0, 21, 41, 0.08);
}
.right .top .info{
    float: right;
}
.right .top .icon{
    float: left;
}
.fixclear{clear:both;}
</style>
