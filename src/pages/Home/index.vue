<template>
    <el-row class="home" :gutter="20">      <!--设置栅格的间距-->
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="userInfo">
                    <img :src="img"/>
                    <div class="user">
                        <p class="name">{{loginAccount.userName}}</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div>
                        <p>上次登陆时间：<span>2022/07/07</span></p>
                        <p>上次登陆地点：<span>湖南省长沙市</span></p>
                </div>
            </el-card>
        </el-col>


        <!-- <el-col :span="10" style="margin-top: 20px">
            <el-card shadow="hover">
                <h1 >用于展示案例</h1>
                <el-button type="primary" @click="getMsg">点击发送请求</el-button>
                        <el-button type="primary" @click="changeToken">点击改变Token</el-button>
                        <p>
                                Token：{{token}}
                        </p>
            </el-card>
        </el-col> -->
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
        }
    },
     computed:{
        ...mapState({
            token: state=>state.user.token,
            loginAccount: state=>state.user.loginAccount
        })
    },
    //防止页面刷新，导致store数据丢失
    created () {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
    methods:{
        async getMsg(){
            console.log(this.loginAccount)
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