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
            @edit="editPayment"
            @delete="deletePayment"
            >
        </common-table>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import CommonForm from '@/components/Common/Form.vue'
import CommonTable from '@/components/Common/Table.vue'
import {reqGetAllUsers,reqUpdateUser,reqCreateUser,reqDeleteUser,
        reqGetAllRepairInfo,reqCreateRepair,reqDeletePayment,reqUpdateRepair} from '@/api/index'
// import babelConfig from 'babel.config'
export default{
    name:'UserManage',
    components:{
        CommonForm,
        CommonTable
    },
    data(){
        return {
            operateType:'edit',          //判断对用户做出的操作
            isShow:false,
            beforeFormLabel:[{
                model:'id',
                label:'ID',
                type:'input'
            },
            {
                model:'fromUser',
                label:'报修人',
                type:'input'
            },
            {
                model:'type',
                label:'类型',
                type:'input'
            },
            {
                model:'start',
                label:'开始时间',
                type:'input'
            },
            {
                model:'end',
                label:'结束时间',
                type:'input'
            },
            {
                model:'description',
                label:'描述',
                type:'input'
            },
            {
                model:'status',
                label:'状态',
                type:'select',
                opts:[
                     {
                        value:'1',
                        label:'已完成'
                    },
                    {
                        value:'0',
                        label:'已报修'
                    }
                ]
            },
            {
                model:'repairId',
                label:'报修号',
                type:'input'
            },
            {
                model:'address',
                label:'地址',
                type:'input'
            },
            {
                model:'phone',
                label:'手机号',
                type:'input'
            },
            
            
            
            ],
            operadeForm:{
                id:'',
                fromUser:'',
                type:'',
                start:'',
                end:'',
                description:'',
                status:'',
                repairID:'',
                address:'',
                phone:' '

            },
             headerFormLabel:[
                {
                    spaceHolder:'请选择搜索项',
                    model:'selectItem',
                    type:'select',
                    opts:[
                        {
                            value:'id',
                            label:'ID'
                        },
                        {
                            value:'fromUser',
                            label:'报修人'
                        },
                        {
                            value:'type',
                            label:'类型'
                        },
                        
                        {
                            value:'status',
                            label:'状态'
                        },
                        
                    ]
                },
                {
                    // label:'姓名',
                    model:'keyword',
                    name:'',             //因为搜索框前无名称，所以此处为空
                    type:'input'
                }
            ],
            headerForm:{
                keyword:'',
                selectItem:''
            },
            // allUsersData:[],           //用于存放所用户的数据
            tableData:[],              //和tableLabel的prop相对应，多一个，少一个没问题,
            tableLabel:[
                {
                    prop:"id",
                    label:"ID",
                    width:80
                },
                {
                    prop:"fromUser",
                    label:"报修人"
                },
                {
                    prop:"type",
                    label:"类型"
                },
                {
                    prop:"start",
                    label:"开始时间"
                },
                {
                    prop:"end",
                    label:"结束时间"
                },
                {
                    prop:"description",
                    label:"描述",
                    width:200
                },
                {
                    prop:"status",
                    label:"状态",
                    width:200
                },
                {
                    prop:"repairID",
                    label:"报修号",
                    
                },
                {
                    prop:"address",
                    label:"地址",
                    
                },
                {
                    prop:"phone",
                    label:"手机号",
                    
                }
            ],
            config:{
                page:1,         //当前选中页码，默认为1
                total:null      //所有的页码
              }
        }
    },
    computed:{
        //获取token：
        ...mapState({
            token: state=>state.user.token
        }),
        //对表格信息进行加工：如果要新增信息，删除ID属性
        formLabel(){
            let temp = [...this.beforeFormLabel];
            // if(this.operateType==='add'){
                temp.forEach(element => {
                    element.label==='ID' ? temp.splice(0,1) : temp      
            });
            // }
            return temp;
        }
    },
    //生命周期函数：
    created(){
       this.getAllRepair(1);
    },
    methods:{
        async confirm(){
            let _this=this;
            _this.isShow=false;
            if(_this.operateType==='add'){          //此时新增一个用户
            console.log('发送的数据：')
            let transData = _this.transType(_this.operadeForm)
            // console.log(_this.operadeForm)
                let res = await reqCreateRepair(_this.token,transData)
                 if(res.code===200){
                _this.$message({
                    type:"success",
                    message:"修改成功"
                })
                _this.getAllRepair(_this.config.page)
                return ;
            }
                //否则，修改失败：
                _this.$message({
                        type:"error",
                        message:"失败"
                    })
            return ;
            }
            //此时编辑一个用户
            let transData = _this.transType(_this.operadeForm)
            console.log(transData)
            let res = await reqUpdateRepair(_this.token,transData)
            if(res.code===200){
                _this.$message({
                    type:"success",
                    message:"修改成功"
                })
                _this.getAllRepair(_this.config.page)
                return ;
            }
            //否则，修改失败：
             _this.$message({
                    type:"error",
                    message:"失败"
                })
            
            
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
        //获取所有订单的信息，并从从中取出10个加载到表格内：
        async getAllRepair(index){
            let _this=this;
            let res = await reqGetAllRepairInfo(_this.token);
            // let res = await reqGetAllUsers(_this.token);
            if(res.code===200){             //此时请求成功
            console.log(res.data[4].status)
                res.data.forEach(element => {
                    element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0]
                    if(element.finishTime!=null){
                    element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0]
                    }
                    element.finishTime!=null ? element.status = '已完成' : element.status = '已报修'

                });
                _this.config.total=res.data.length;
                _this.tableData = [..._this.getTenRepairments(index,res.data)];
            }
        },
         //每次从请求到的所有数组中去除10个用户，提交给界面
        getTenRepairments(index,allUsers){
            let _this = this;
            //首先确认还有没有10页
            if(index*10-1 > _this.config.total){ //此时不够10页了
                return allUsers.splice((index-1)*10,_this.config.total-(index-1)*10);
            }
            //否则还有10页或者更多
            return allUsers.splice((index-1)*10,10);
        },
        //在表格内搜索
        changePage(page){
            this.getAllRepair(page)
        },
        //编辑用户信息
        editPayment(row){
            this.operadeForm=row;
            this.operateType='edit'
            this.isShow=true;
        },
        //删除该用户
         deletePayment(row){
            let _this=this;
            //弹出提示框
            _this.$confirm("注意：此操作将永久删除该用户，是否继续？","提示",
            {
                confirmButtonText:"确认" ,
                cancelIdleCallback:"取消",
                type:"warning"
            }).then(()=>{
                reqDeletePayment(_this.token,row.id).then(res=>{
                    console.log(res);
                    if(res.code === 200){
                        _this.$message({
                        type:"success",
                        message:"删除成功"
                        })
                        _this.getAllRepair(_this.config.page)
                        return 
                    }
                    _this.$message({
                        type:"error",
                        message:"删除失败"
                    })
                    return 
                })
                    
                })
        },
        //获取所有的用户信息
        async getByKeyWord(){
            let _this=this;
            if(!_this.headerForm.selectItem ){
                _this.$message({
                    type:"warning",
                    message:"请先选择搜索项"
                })
                return ;
            }
            if(!_this.headerForm.keyword && _this.headerForm.selectItem!='all'){
                _this.$message({
                    type:"warning",
                    message:"请输入内容再查询"
                })
                return ;
            }
            //开始查询：
            let tempArr=[];
            let res = await reqGetAllRepairInfo(_this.token);
            if(res.code===200){             //此时请求成功
            console.log(res.data)
                res.data.forEach(element => {
                    //根据选项，进行相应条目的搜索
                switch(_this.headerForm.selectItem){
                    case 'id':
                        if(element.id!=null){
                            if((element.id+'').indexOf(_this.headerForm.keyword+'')>=0){
                                element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0];
                                if(element.finishTime!=null){
                                element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0];
                                }
                                element.finishTime!=null ? element.status = '已完成' : element.status = '已报修';
                                tempArr.push(element);
                            }
                        }break;
                    case 'fromUser':
                        if(element.fromUser!=null){
                            if((element.fromUser+'').indexOf(_this.headerForm.keyword+'')>=0){
                                element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0];
                                if(element.finishTime!=null){
                                element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0];
                                }
                                element.finishTime!=null ? element.status = '已完成' : element.status = '已报修';
                                tempArr.push(element);
                            }
                        }break;
                    
                    case 'type':
                        if(element.type!=null){
                            if(element.type.indexOf(_this.headerForm.keyword)>=0){
                                element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0];
                                if(element.finishTime!=null){
                                element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0];
                                }
                                element.finishTime!=null ? element.status = '已完成' : element.status = '已报修';
                                tempArr.push(element);
                            }
                        }break;
                   
                    case 'status':
                        if(element.status!=null){
                            if((!!element.finishTime && _this.headerForm.keyword === '已完成')||
                            (!element.finishTime && _this.headerForm.keyword === '已报修')){
                                element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0];
                                if(element.finishTime!=null){
                                element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0];
                                }
                                element.finishTime!=null ? element.status = '已完成' : element.status = '已报修';
                                tempArr.push(element);
                            }
                        }break;
                    
                    default:
                }
                });
                _this.config.total=tempArr.length;
                _this.config.page=1;                //默认跳到第一页
                _this.tableData = [..._this.getTenRepairments(1,tempArr)];
            }
            
        },

        //对repair的数据类型进行转换
        transType(repair){
            //字符串转数字
            !repair.id ? repair.id=null : repair.id = Number(repair.id);
            !repair.fromUser ? repair.fromUser=null : repair.fromUser = Number(repair.fromUser);
            
            //字符串转boolean
            !repair.status ? repair.status=false : repair.status = true ;
            //字符串转Date
            // if(!repair.time){
            //     repair.time=null
            // } else{
            //     repair.time = repair.time.replace(/-/,"/");
            //     repair.time = new Date(repair.time)
            // } 
            // if(!repair.finishTime){
            //     repair.finishTime=null
            // } else{
            //     repair.finishTime = repair.finishTime.replace(/-/,"/");
            //     repair.finishTime = new Date(repair.finishTime)
            // } 

            return repair;
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