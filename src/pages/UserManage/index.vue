<template>
    <div class="userManage">
        <!-- 弹出窗口 -->
        <el-dialog 
            :title="operateType === 'add' ? '新增用户' : '修改信息'"
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
            
            <el-button type="primary" @click="addUser">+ 新增</el-button>
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
            @edit="editUser"
            @delete="deleteUser"
            >
        </common-table>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import CommonForm from '@/components/Common/Form.vue'
import CommonTable from '@/components/Common/Table.vue'
import {reqGetAllUsers} from '@/api/index'
export default{
    name:'UserManage',
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
                model:'userName',
                label:'用户名',
                type:'input'
            },
            {
                model:'password',
                label:'密码',
                type:'input'
            },
            {
                model:'name',
                label:'姓名',
                type:'input'
            },
            {
                model:'sex',
                label:'性别',
                type:'select',
                opts:[
                    {
                        value:'female',
                        label:'男'
                    },{
                        value:'male',
                        label:'女'
                    }
                    
                ]
            },
            {
                model:'phoneNumber',
                label:'手机号',
                type:'input'
            },
            {
                model:'email',
                label:'邮箱',
                type:'input'
            },
            {
                model:'buildingNumber',
                label:'楼栋号',
                type:'input'
            },
            {
                model:'roomNumber',
                label:'房间号',
                type:'input'
            }
            ],
            operadeForm:{
                id:'',
                userName:'',
                password:'',
                name:'',
                sex:'',
                phoneNumber:'',
                email:'',
                buildingNumber:'',
                roomNumber:''

            },
            headerFormLabel:[
                {
                    model:'keyword',
                    name:'',             //因为搜索框前无名称，所以此处为空
                    type:'input'
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
                    prop:"userName",
                    label:"用户名"
                },
                {
                    prop:"passowrd",
                    label:"密码"
                },
                {
                    prop:"name",
                    label:"姓名"
                },
                {
                    prop:"sex",
                    label:"性别"
                },
                {
                    prop:"phoneNumber",
                    label:"手机号",
                    width:150
                },
                {
                    prop:"email",
                    label:"邮箱",
                    width:150
                },
                {
                    prop:"buildingNumber",
                    label:"楼栋号",
                    
                },
                {
                    prop:"roomNumber",
                    label:"房间号",
                    
                }
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
       this.getAllUsers();
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
                userName:'',
                sex:''
            }
        },
        //获取所有用户信息，并加载到表格内：
        async getAllUsers(){
            let _this=this;
            let res = await reqGetAllUsers(_this.token);
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
        editUser(row){
            // this.operadeForm=row;
            this.operadeForm=row;
            this.isShow=true;
        },
        //删除该用户
        deleteUser(){
            //弹出提示框
            this.$confirm("注意：此操作将永久删除该用户，是否继续？","提示",
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
            
        }

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