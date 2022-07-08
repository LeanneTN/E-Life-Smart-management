<template>
    <header>
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <h3 style="color: #fff">{{location}}</h3>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span>
                    <img class="user" :src="userImg">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="layout()">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import {reqSignOut} from '@/api/index'
import {mapState} from 'vuex'
export default{
    name:'Header',
    data(){
        return {
            userImg:require('../../assets/logo.png'),
        }
    },
    methods:{
        // 点击改变侧边栏状态
        handleMenu(){
            //用于调用Mutation
            this.$store.commit('changeCollapse')
        },
        //退出登录
        async layout(){
            let res = await reqSignOut(this.token);
            if(res.code===200){
                this.$router.push({
                    name:'Login'
                })
            }
        }
    },
    computed:{
        ...mapState({
            token: state=>state.user.token,
            location: state=>state.tabs.location
        })
    }
}

</script>

<style lang="less" scoped>
header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;          //垂直居中
}
.l-content {
    display: flex;
    align-items: center;
    .el-button {
        margin-right: 20px;
    }
}
.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

</style>
