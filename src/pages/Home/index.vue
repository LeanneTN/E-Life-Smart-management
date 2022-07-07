<template>
    <el-row class="home" :gutter="20">      <!--设置栅格的间距-->
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="userInfo">
                    <img :src="img"/>
                    <div class="user">
                        <p class="name">{{user.name}}</p>
                        <p class="access">{{user.access}}</p>
                    </div>
                </div>
                <div>
                        <p>上次登陆时间：<span>2022/07/07</span></p>
                        <p>上次登陆地点：<span>湖南省长沙市</span></p>
                </div>
            </el-card>
        </el-col>


        <el-col :span="10" style="margin-top: 20px">
            <el-card shadow="hover">
                <h1 >用于展示案例</h1>
                <el-button type="primary" @click="getMsg">点击发送请求</el-button>
                        <el-button type="primary" @click="changeToken">点击改变Token</el-button>
                        <p>
                                Token：{{token}}
                        </p>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import {reqCaptcha,reqLoginByAccount} from '@/api/index'
import {mapState} from 'vuex'               //引入Vuex，从而使用Store实现数据的存取
export default{
    name:'Home',
    data(){
        return {
            img: require('../../assets/logo.png'),
            user:{
                name:'Admin',
                access:'超级管理员'
            }
        }
    },
    computed:{
        // token(){
        //      return this.$store.state.user.token     //直接调用，获取
        // },
        ...mapState({
            token: state=>state.user.token,
            loginAccount: state=>state.user.loginAccount
        })
    },
    methods:{
        changeToken(){
             this.$store.dispatch('token',this.token+'1')          //修改store（仓库）内的数据
        },
        async getMsg(){
            /*         不带参数的请求
            console.log('开始发送请求');
            let res = reqCaptcha();
            console.log('请求成功')
            console.log((await res).data);
            */
           /*          带参数的请求
            let userName = '张三';
            let password = '123456';
            let res = reqLoginByAccount(userName,password);
            console.log((await res).data);
            */

        }
    }
}

</script>

<style lang="less" scoped>
.userInfo {
    display: flex;
    justify-content: space-evenly;

    img {
    height: 100px;
    width: 100;
    border-radius: 50%;
    background-color: #77DDFF;
}
}

</style>