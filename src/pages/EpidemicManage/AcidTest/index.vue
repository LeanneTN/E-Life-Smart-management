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
            
            <el-button type="primary" @click="addUser">+ 新增信息</el-button>
             <common-form
                :formLabel="headerFormLabel"
                :form="headerForm"
                :inline="true"
                @lostFocus="lostFocus"
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
import {reqGetAllHealth,reqUpdateUser,reqCreateUser,reqDeleteUser} from '@/api/index'
export default{
    name:'AcidTest',
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
                    spaceHolder:'请选择搜索项',
                    model:'selectItem',
                    type:'select',
                    opts:[
                        {
                            value:'id',
                            label:'ID'
                        },
                        {
                            value:'uid',
                            label:'用户编号'
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
       this.getAllHealth(1);
    },
    methods:{
        async confirm(){
            let _this=this;
            _this.isShow=false;
            if(_this.operateType==='add'){          //此时新增一个用户
                let res = await reqCreateUser(_this.token,_this.operadeForm)
                 if(res.code===200){
                _this.$message({
                    type:"success",
                    message:"修改成功"
                })
                _this.getAllHealth(_this.config.page)
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
            let res = await reqUpdateUser(_this.token,_this.operadeForm)
            if(res.code===200){
                _this.$message({
                    type:"success",
                    message:"修改成功"
                })
                _this.getAllHealth(_this.config.page)
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
        //获取所有10个用户的信息，并加载到表格内：
        async getAllHealth(index){
            let _this=this;
            let res = await reqGetAllHealth(_this.token);
            if(res.code===200){             //此时请求成功
                
                _this.config.total=res.data.length;
                _this.tableData = [..._this.getTenUsers(index,res.data)];
            }
        },
         //每次从请求到的所有数组中去除10个用户，提交给界面
        getTenUsers(index,allUsers){
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
            this.getAllHealth(page)
        },
        //编辑用户信息
        editUser(row){
            this.operadeForm=row;
            this.operateType='edit'
            this.isShow=true;
        },
        //删除该用户
         deleteUser(row){
            let _this=this;
            //弹出提示框
            _this.$confirm("注意：此操作将永久删除该用户，是否继续？","提示",
            {
                confirmButtonText:"确认" ,
                cancelIdleCallback:"取消",
                type:"warning"
            }).then(()=>{
                //此处说明点击了‘确认’，开始进行删除
                // let res =  reqDeleteUser(_this.token,row.id);
                reqDeleteUser(_this.token,row.id).then(res=>{
                    console.log(res);
                    if(res.code === 200){
                        _this.$message({
                        type:"success",
                        message:"删除成功"
                        })
                        _this.getAllHealth(_this.config.page)
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
            if(!_this.headerForm.keyword && _this.headerForm.selectItem!=='all'){
                _this.$message({
                    type:"warning",
                    message:"请输入内容再查询"
                })
                return ;
            }

            //开始查询：
            console.log(_this.headerForm.selectItem)
            let tempArr=[];
            let res = await reqGetAllHealth(_this.token);
            if(res.code===200){             //此时请求成功
                res.data.forEach(element => {
                    //根据用户选择的搜索项，进行搜索
                    switch (_this.headerForm.selectItem){
                        case  'id':
                            if(element.id!=null){
                                let temp = element.id+'';
                            if(temp.indexOf(_this.headerForm.keyword+'')>=0){
                                // element.sex === '1' ? element.sex='男' : element.sex='女';
                                tempArr.push(element);
                            }}break;
                        case  'uid':
                            if(element.userName!=null){
                            if(element.userName.indexOf(_this.headerForm.keyword)>=0){
                                // element.sex === '1' ? element.sex='男' : element.sex='女';
                                tempArr.push(element);
                            }}break;
                        
                        case  'all':
                            _this.getAllHealth(1);
                        default:    return ;
                    }

                });
                _this.config.total=tempArr.length;
                _this.config.page=1;                //默认跳到第一页
                _this.tableData = [..._this.getTenUsers(1,tempArr)];
            }
            
        },
        //搜索框焦点消失事件
        async lostFocus(){
            // let _this = this;
            // if(_this.headerForm.keyword===null){
            //     console.log('')
            //     _this.getAllHealth(1)
            // }
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