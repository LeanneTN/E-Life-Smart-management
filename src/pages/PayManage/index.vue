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
        reqGetAllPayInfo,reqCreatePayment,reqDeletePayment,reqUpdatePayment} from '@/api/index'
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
                label:'支付方',
                type:'input'
            },
            {
                model:'toAdmin',
                label:'收款方',
                type:'input'
            },
            {
                model:'type',
                label:'付费类型',
                type:'select',
                opts:[
                    {
                        value:'parking',
                        label:'停车缴费'
                    },
                    {
                        value:'repair',
                        label:'维修缴费'
                    },
                    {
                        value:'hydropower',
                        label:'水电缴费'
                    },
                    {
                        value:'Property',
                        label:'物业缴费'
                    },  
                    {
                        value:'other',
                        label:'其它缴费'
                    }
                ]
            },
            {
                model:'sum',
                label:'合计',
                type:'input'
            },
            {
                model:'time',
                label:'产生时间',
                type:'date'
            },
            {
                model:'finishTime',
                label:'支付时间',
                type:'date'
            },
            {
                model:'if_paid',
                label:'是否已支付',
                type:'select',
                opts:[
                     {
                        value:'1',
                        label:'已支付'
                    },
                    {
                        value:'0',
                        label:'未支付'
                    }
                ]
            }
            ],
            operadeForm:{
                id:'',
                fromUser:'',
                toAdmin:'',
                type:'',
                sum:'',
                time:'',
                finishTime:'',
                if_paid:''

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
                            label:'支付方'
                        },
                        {
                            value:'toAdmin',
                            label:'收款方'
                        },
                        {
                            value:'type',
                            label:'付费类型'
                        },
                        {
                            value:'sumBig',
                            label:'合计>='
                        },
                        {
                            value:'sumSmall',
                            label:'合计<'
                        },
                        {
                            value:'time',
                            label:'产生时间'
                        },
                        {
                            value:'finishTime',
                            label:'支付时间'
                        },
                        {
                            value:'if_paid',
                            label:'是否已支付'
                        },
                        {
                            value:'all',
                            label:'所有订单'
                        }
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
                    label:"支付方"
                },
                {
                    prop:"toAdmin",
                    label:"收款方"
                },
                {
                    prop:"type",
                    label:"付费类型"
                },
                {
                    prop:"sum",
                    label:"合计"
                },
                {
                    prop:"time",
                    label:"产生时间",
                    width:200
                },
                {
                    prop:"finishTime",
                    label:"支付时间",
                    width:200
                },
                {
                    prop:"if_paid",
                    label:"是否已支付",
                    
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
        //对表格信息进行加工：如果要新增用户，删除ID属性
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
       this.getAllPayments(1);
    },
    methods:{
        async confirm(){
            let _this=this;
            _this.isShow=false;
            if(_this.operateType==='add'){          //此时新增一个用户
            console.log('发送的数据：')
            let transData = _this.transType(_this.operadeForm)
            // console.log(_this.operadeForm)
                let res = await reqCreatePayment(_this.token,transData)
                 if(res.code===200){
                _this.$message({
                    type:"success",
                    message:"修改成功"
                })
                _this.getAllPayments(_this.config.page)
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
            let res = await reqUpdatePayment(_this.token,transData)
            if(res.code===200){
                _this.$message({
                    type:"success",
                    message:"修改成功"
                })
                _this.getAllPayments(_this.config.page)
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
        async getAllPayments(index){
            let _this=this;
            let res = await reqGetAllPayInfo(_this.token);
            // let res = await reqGetAllUsers(_this.token);
            if(res.code===200){             //此时请求成功
            console.log(res.data[4].if_paid)
                res.data.forEach(element => {
                    element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0]
                    if(element.finishTime!=null){
                    element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0]
                    }
                    element.finishTime!=null ? element.if_paid = '已支付' : element.if_paid = '未支付'

                });
                _this.config.total=res.data.length;
                _this.tableData = [..._this.getTenPayments(index,res.data)];
            }
        },
         //每次从请求到的所有数组中去除10个用户，提交给界面
        getTenPayments(index,allUsers){
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
            this.getAllPayments(page)
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
                        _this.getAllPayments(_this.config.page)
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
            let res = await reqGetAllPayInfo(_this.token);
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
                                element.finishTime!=null ? element.if_paid = '已支付' : element.if_paid = '未支付';
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
                                element.finishTime!=null ? element.if_paid = '已支付' : element.if_paid = '未支付';
                                tempArr.push(element);
                            }
                        }break;
                    case 'toAdmin':
                        if(element.toAdmin!=null){
                            if((element.toAdmin+'').indexOf(_this.headerForm.keyword+'')>=0){
                                element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0];
                                if(element.finishTime!=null){
                                element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0];
                                }
                                element.finishTime!=null ? element.if_paid = '已支付' : element.if_paid = '未支付';
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
                                element.finishTime!=null ? element.if_paid = '已支付' : element.if_paid = '未支付';
                                tempArr.push(element);
                            }
                        }break;
                    case 'sumBig':
                        if(element.sum!=null){
                            if(element.sum>=_this.headerForm.keyword){
                                element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0];
                                if(element.finishTime!=null){
                                element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0];
                                }
                                element.finishTime!=null ? element.if_paid = '已支付' : element.if_paid = '未支付';
                                tempArr.push(element);
                            }
                        }break;
                    case 'sumSmall':
                        if(element.sum!=null){
                            if(element.sum < _this.headerForm.keyword){
                                element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0];
                                if(element.finishTime!=null){
                                element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0];
                                }
                                element.finishTime!=null ? element.if_paid = '已支付' : element.if_paid = '未支付';
                                tempArr.push(element);
                            }
                        }break;
                    case 'time':
                        if(element.time!=null){
                            if(element.time.indexOf(_this.headerForm.keyword)>=0){
                                element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0];
                                if(element.finishTime!=null){
                                element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0];
                                }
                                element.finishTime!=null ? element.if_paid = '已支付' : element.if_paid = '未支付';
                                tempArr.push(element);
                            }
                        }break;
                    case 'finishTime':
                        if(element.finishTime!=null){
                            if(element.finishTime.indexOf(_this.headerForm.keyword)>=0){
                                element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0];
                                if(element.finishTime!=null){
                                element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0];
                                }
                                element.finishTime!=null ? element.if_paid = '已支付' : element.if_paid = '未支付';
                                tempArr.push(element);
                            }
                        }break;
                    case 'if_paid':
                        if(element.if_paid!=null){
                            if((!!element.finishTime && _this.headerForm.keyword === '已支付')||
                            (!element.finishTime && _this.headerForm.keyword === '未支付')){
                                element.time = element.time.split("T")[0]+' '+element.time.split("T")[1].split(".")[0];
                                if(element.finishTime!=null){
                                element.finishTime = element.finishTime.split("T")[0]+' '+element.finishTime.split("T")[1].split(".")[0];
                                }
                                element.finishTime!=null ? element.if_paid = '已支付' : element.if_paid = '未支付';
                                tempArr.push(element);
                            }
                        }break;
                    case 'all':
                        _this.getAllPayments(1);
                        break;
                    default:
                }
                });
                _this.config.total=tempArr.length;
                _this.config.page=1;                //默认跳到第一页
                _this.tableData = [..._this.getTenPayments(1,tempArr)];
            }
            
        },

        //对payment的数据类型进行转换
        transType(payment){
            //字符串转数字
            !payment.id ? payment.id=null : payment.id = Number(payment.id);
            !payment.fromUser ? payment.fromUser=null : payment.fromUser = Number(payment.fromUser);
            !payment.toAdmin ? payment.toAdmin=null : payment.toAdmin = Number(payment.toAdmin) ;
            !payment.sum ? payment.sum=null : payment.sum = Number(payment.sum) ;
            //字符串转boolean
            !payment.if_paid ? payment.if_paid=false : payment.if_paid = true ;
            //字符串转Date
            if(!payment.time){
                payment.time=null
            } else{
                payment.time = payment.time.replace(/-/,"/");
                payment.time = new Date(payment.time)
            } 
            if(!payment.finishTime){
                payment.finishTime=null
            } else{
                payment.finishTime = payment.finishTime.replace(/-/,"/");
                payment.finishTime = new Date(payment.finishTime)
            } 

            return payment;
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