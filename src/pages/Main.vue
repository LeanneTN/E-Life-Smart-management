<template>
    <div class="father1">
        <el-container style="height :100%">
            <el-aside width="auto">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script> 
import Aside from '../components/Common/Aside.vue'      //导出组件

export default {
    name:'Home',   
    components:{        
        Aside               //将上面导出的组件引入
    } ,
    data(){
        return {

        }
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