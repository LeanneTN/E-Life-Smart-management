<template>
    <div class="common-table" >
        <el-table :data="tableData" height="90%" stripe border fit  
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }">
            <el-table-column 
                show-overflow-tooltip       
                v-for="item in tableLabel" :key="item.prop" :label="item.label" 
                :width="item.width ? item.width : 100">

                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180"> 
                <template slot-scope="scope">
                <el-button size="mini" @click="cEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="cDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页标签 -->
        <el-pagination 
            class="paper"
            layout="prev, pager, next"
            :total="config.total"
            :current-page.sync="config.page"
            @current-change="changePage"
            :page-size="10">
        </el-pagination>
    </div>
</template>

<script>

export default ({
    name:'CommonTable',
    props:{
        tableData:Array,
        tableLabel:Array,
        config:Object,
    },
    data() {
        return {

        }
    },
    methods: {
        cEdit(row){
            /*将当前行的数据向上传递给父组件（），
            也就是调用该表格的页面，父组件通过@editUser来绑定相应的事件*/
            // console.log(row)
            this.$emit('edit',row)    
        },
        cDelete(row){
            this.$emit('delete',row)  
        },
        changePage(page){
            this.$emit('changePage',page)  
        }
        
    },
})
</script>

<style lang="less" scoped>
.common-table {
    // height: calc(100% - 62px);
    height: 600px;
    background-color: #fff;
    position: relative;
    .paper {
        position: absolute;
        bottom: 0;
        right: 20px;
    }
    
}
// .pTable {
//     height: 600px !important;
//     text-align: center;
// }

</style>
