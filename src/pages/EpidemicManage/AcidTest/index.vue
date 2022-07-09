<template>
    <div class="userManage">
        <!-- 弹出窗口 -->
        <el-dialog 
            :title="operateType === 'add' ? '新增信息' : '修改信息'"
            :visible.sync="isShow">
            <common-form
                :formLabel="formLabel"
                :form="operadeForm"
                :inline="true"
                ref="form">
            </common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow=false">取消</el-button>
                <el-button @click="confirm" type="primary">确定</el-button>
            </div>
        </el-dialog>
        <!-- 顶部操作窗口 -->
        <div class="manage-header">
            
            <el-button type="primary" @click="addUser">+ 新增信息</el-button>
             <common-form
                :formLabel="headerFormLabel"
                :form="headerForm"
                :inline="true"
                ref="form"
                >
                <el-button type="primary" @click="getByKeyWord">搜索</el-button>
            </common-form>
        </div>
        <!-- 引入自定义的table组件 -->
        <common-table
            :tableData="tableData"
            :tableLabel="tableLabel"
            :config="config"
            @changePage="changePage"
            @edit="editInfo"
            @delete="deleteInfo"
            >
        </common-table>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import CommonForm from '@/components/Common/Form.vue'
import CommonTable from '@/components/Common/Table.vue'
import {reqGetAllHealth} from '@/api/index'
export default{
    name:'AcidTest',
    components:{
        CommonForm,
        CommonTable
    },
    data(){
        return {
            operateType:'add',          //判断对用户做出的操作
            isShow:false,
            beforeFormLabel:[{
                model:'id',
                label:'ID',
                type:'input'
            },
            {
                model:'uid',
                label:'用户编号',
                type:'input'
            },
            {
                model:'temp',
                label:'参数',
                type:'input'
            },
            {
                model:'location',
                label:'地点',
                type:'input'
            },
            {
                model:'time',
                label:'时间',
                type:'input',
                
            },
            {
                model:'other_info',
                label:'其他信息',
                type:'input'
            },
            
            {
                model:'area_level',
                label:'地区风险等级',
                type:'input'
            },
            ],
            operadeForm:{
                id:'',
                uid:'',
                temp:'',
                time:'',
                location:'',
                other_info:'',
                area_level:''

            },
            headerFormLabel:[
                {
                    model:'keyword',
                    // name:'',             //因为搜索框前无名称，所以此处为空
                    type:'select'
                }
            ],
            headerForm:{
                keyword:''
            },
            tableData:[],              //和tableLabel的prop相对应，多一个，少一个没问题,
            tableLabel:[
                {
                    prop:"id",
                    label:"ID",
                    width:80
                },
                {
                    prop:"uid",
                    label:"用户编号"
                },
                {
                    prop:"temp",
                    label:"参数"
                },
                {
                    prop:"location",
                    label:"地点"
                },
                {
                    prop:"time",
                    label:"时间",
                    width:250
                },
                {
                    prop:"other_info",
                    label:"其他信息"
                },
                {
                    prop:"area_level",
                    label:"地区风险等级",
                    width:150
                },
                
            ],
            config:{
                page:1,         //默认页码
                total:30
              }
        }
    },
    computed:{
        //获取token：
        ...mapState({
            token: state=>state.user.token
        }),
        //对表格信息进行加工：如果要新增用户，I删除ID属性
        formLabel(){
            let temp = this.beforeFormLabel;
            if(this.operateType==='add'){
                temp.forEach(element => {
                    element.label==='ID' ? temp.splice(0,1) : temp      
            });
            }
            return temp;
        }
    },
    //生命周期函数：
    created(){
       this.getAllHealth();
    },
    methods:{
        confirm(){
            this.isShow=false;
            // console.log(this.operadeForm)
        },
        addUser(){
            this.isShow = true;
            this.operateType='add';
            this.operadeForm={
                id:'',
                uid:'',
                location:''
            }
        },
        //获取所有打卡信息，并加载到表格内：
        async getAllHealth(){
            let _this=this;
            let res = await reqGetAllHealth(_this.token);
            if(res.code===200){             //此时请求成功
                _this.tableData = [...res.data]
                console.log(_this.tableData)
            }
        },
        //在表格内搜索
        changePage(page){
            console.log(page)
        },
        //编辑用户信息
        editInfo(row){
            // this.operadeForm=row;
            this.operadeForm=row;
            this.isShow=true;
        },
        //删除该用户
        deleteInfo(){
            //弹出提示框
            this.$confirm("注意：删除该信息？","提示",
            {
                confirmButtonText:"确认" ,
                cancelIdleCallback:"取消",
                type:"warning"
            }).then(()=>{
                //此处说明点击了‘确认’，开始进行删除

                //最后添加一个消息提示框：
                this.$message({
                    type:"success",
                    message:"删除成功"
                })
            })
        },
        //获取所有的用户信息
        getByKeyWord(){
        //     let _this=this;
        //     if(!_this.headerForm.keyword){
        //         _this.$message({
        //             type:"warning",
        //             message:"请输入ID查询"
        //         })
        //         return ;
        //     }
        //     let tempArr=[];
        //     let res = await reqGetAllHealth(_this.token);
        //     if(res.code===200){             //此时请求成功
        //         res.data.forEach(element => {
        //             if(element.id!=null){
        //                         let temp = element.id+'';
        //                         if(temp.indexOf(_this.headerForm.keyword+'')>=0){
        //                         element.sex === '1' ? element.sex='男' : element.sex='女';
        //                         tempArr.push(element);
        //                     }}
        //         });
        //          _this.config.total=tempArr.length;
        //         _this.config.page=1;                //默认跳到第一页
        //         _this.tableData = [..._this.getTenUsers(1,tempArr)];

        // }

    },
}
}


</script>

<style lang="less" scoped>
.manage-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20px;
}

</style>