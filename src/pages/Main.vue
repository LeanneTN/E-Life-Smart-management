<template>
    <div class="father1">
        <el-container style="height :100%">
            <el-aside width="auto">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script> 
import Aside from '../components/Common/Aside.vue'      //导出组件
import Header from '../components/Common/Header.vue'

export default {
    name:'Home',   
    components:{        
        Aside,
        Header               //将上面导出的组件引入
    } ,
    data(){
        return {

        }
    },
    //路由默认转到首页
    mounted(){
            this.$router.push({name:'Home'})
    }

}
</script>


<style lang="less" scope>
.father1 {
    height: 100%;

}

.el-header {
    background-color: #333;
}

.el-main{
    padding-top: 0;
}

</style>