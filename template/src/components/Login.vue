<template>
    <section class="login">
        <el-card shadow="hover" body-style="padding: 25px;">
            <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <h1> 管理系统 </h1>
            <el-form ref="form" :model="user" label-width="80px" :rules="rules">
                <el-form-item label-width="0" prop="username">
                    <el-input
                        placeholder="用户名"
                        v-model="user.username"
                        size="medium"
                        prefix-icon="el-icon-user-solid"
                        @keyup.enter.native="login"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label-width="0" prop="password">
                    <el-input
                        :type="passwordType"
                        size="medium"
                        placeholder="密码"
                        prefix-icon="el-icon-lock"
                        v-model="user.password"
                        @keyup.enter.native="login"
                    >
                    <i slot="suffix" class="el-input__icon el-icon-view" @click="changePwdIpt" ></i>
                    </el-input>
                </el-form-item>
                <div>
                    <el-button type="primary" size="medium" style="width:100%;" @click="login">登录</el-button>
                </div>
            </el-form>
        </el-card>
    </section>
</template>

<script>
import common from "@/util/common";
import { api } from "@/api/system"
import {mapMutations} from 'vuex'
export default {
    name: 'Login',
    data () {
        return {
            passwordType: 'password',
            user:{
                username:'',
                password:''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        ...mapMutations({
            setToken: 'setToken'
        }),
        login(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    api.adminLogin(this.user).then((res)=>{
                        this.setToken(res.data.token);
                        common.setCookie(common.dataKey,res.data.token,'d1');
                        this.$message.success('欢迎回来！')
                        this.$router.push('/');
                    })
                }
            })
        },
        changePwdIpt(){
            this.passwordType = this.passwordType=='password'?'text':'password'
        }
    }
}
</script>
<style scoped lang="less">
body{background-color: #eff2f5;}
.logo img{
    height: 100px;
    margin-top: 29px;
}
.login{
    width: 380px;
    height:100%;
    margin: 0 auto;
    margin-top: 12%;
    text-align: center;
    .el-icon-view{
        cursor: pointer;
    }
}
</style>
