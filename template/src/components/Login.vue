<template>
    <section class="login">
        <van-form @submit="login">
        <van-field
            v-model="user.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="user.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
        </van-form>
    </section>
</template>

<script>
import common from "@/util/common";
import api from "@/util/api";
import {mapMutations} from 'vuex'
import { Form,Field,Button } from 'vant';
export default {
    name: 'Login',
    components:{
        VanForm:Form,
        VanField:Field,
        VanButton:Button
    },
    data () {
        return {
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        ...mapMutations({
            setToken: 'setToken'
        }),
        login(){
            api.login(this.user).then((res)=>{
                this.setToken(res.data.token);
                common.setCookie('_KEYDATA',res.data.token,'d1');
                this.$router.push('/');
            });
            
        }
    }
}
</script>
<style scoped>
.login{
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 100px;
}
</style>