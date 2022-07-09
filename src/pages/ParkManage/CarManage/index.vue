<template>
    <div class="CarManage">
        <!-- 弹出窗口 -->
        <el-dialog :title="operateType === 'add' ? '新增用户' : '修改信息'" :visible.sync="isShow">
            <common-form :formLabel="formLabel" :form="operadeForm" :inline="true" ref="form">
            </common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button @click="confirm" type="primary">确定</el-button>
            </div>
        </el-dialog>
        <!-- 顶部操作窗口 -->
        <div class="manage-header">

            <el-button type="primary" @click="addCar">+ 新增</el-button>
            <common-form :formLabel="headerFormLabel" :form="headerForm" :inline="true" @lostFocus="lostFocus"
                ref="form">
                <el-button type="primary" @click="getByKeyWord">搜索</el-button>
            </common-form>
        </div>
        <!-- 引入自定义的table组件 -->
        <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="changePage"
            @edit="editCar" @delete="deleteCar">
        </common-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonForm from '@/components/Common/Form.vue'
import CommonTable from '@/components/Common/Table.vue'
import { reqGetAllCar, reqUpdateCar, reqCreateCar, reqDeleteCar } from '@/api/index'
export default {
    name: 'CarManage',
    components: {
        CommonForm,
        CommonTable
    },
    data() {
        return {
            operateType: 'edit',          //判断对用户做出的操作
            isShow: false,
            beforeFormLabel: [{
                model: 'id',
                label: '车牌号',
                type: 'input'
            },
            {
                model: 'owner',
                label: '车主ID',
                type: 'input'
            }
            ],
            operadeForm: {
                id: '',
                owner: ''
            },
            headerFormLabel: [
                {
                    spaceHolder: '请选择搜索项',
                    model: 'selectItem',
                    type: 'select',
                    opts: [
                        {
                            value: 'id',
                            label: '车牌号'
                        },
                        {
                            value: 'owner',
                            label: '车主ID'
                        },
                        {
                            value: 'all',
                            label: '所有停车位'
                        }
                    ]
                },
                {
                    model: 'keyword',
                    name: '',             //因为搜索框前无名称，所以此处为空
                    type: 'input'
                }
            ],
            headerForm: {
                keyword: '',
                selectItem: ''
            },
            tableData: [],              //和tableLabel的prop相对应，多一个，少一个没问题,
            tableLabel: [
                {
                    prop: "id",
                    label: "车牌号",
                    width: 200
                },
                {
                    prop: "owner",
                    label: "车主ID",
                    width: 200
                }
            ],
            config: {
                page: 1,         //默认页码
                total: null
            }
        }
    },
    computed: {
        //获取token：
        ...mapState({
            token: state => state.user.token
        }),
        //对表格信息进行加工：如果要新增用户，I删除ID属性
        formLabel() {
            let temp = [...this.beforeFormLabel];
            // if(this.operateType==='add'){
            temp.forEach(element => {
                element.label === 'ID' ? temp.splice(0, 1) : temp
            });
            //}
            return temp;
        }
    },
    //生命周期函数：
    created() {
        this.getAllCar(1);
    },
    methods: {
        async confirm() {
            let _this = this;
            _this.isShow = false;
            if (_this.operateType === 'add') {          //此时新增一个用户
                let res = await reqCreateCar(_this.token, _this.operadeForm)
                if (res.code === 200) {
                    _this.$message({
                        type: "success",
                        message: "修改成功"
                    })
                    _this.getAllCar(_this.config.page)
                    return;
                }
                //否则，修改失败：
                _this.$message({
                    type: "error",
                    message: "失败"
                })
                return;
            }
            //此时编辑一个用户
            let res = await reqUpdateCar(_this.token, _this.operadeForm)
            if (res.code === 200) {
                _this.$message({
                    type: "success",
                    message: "修改成功"
                })
                _this.getAllCar(_this.config.page)
                return;
            }
            //否则，修改失败：
            _this.$message({
                type: "error",
                message: "失败"
            })
        },
        addParkSpace() {
            this.isShow = true;
            this.operateType = 'add';
            this.operadeForm = {
                id: '',
                owner: ''
            }
        },
        //获取所有10个停车位信息，并加载到表格内：
        async getAllCar(index) {
            let _this = this;
            let res = await reqGetAllCar(_this.token);
            if (res.code === 200) {             //此时请求成功
                _this.config.total = res.data.length;
                _this.tableData = [..._this.getTenCar(index, res.data)];
            }
        },
        //每次从请求到的所有数组中去除10个停车位，提交给界面
        getTenCar(index, allCar) {
            let _this = this;
            if (index * 10 - 1 > _this.config.total) {
                return allCar.splice((index - 1) * 10, _this.config.total - (index - 1) * 10);
            }
            return allCar.splice((index - 1) * 10, 10);
        },
        //在表格内搜索
        changePage(page) {
            this.getAllCar(page)
        },
        //编辑用户信息
        editCar(row) {
            this.operadeForm = row;
            this.operateType = 'edit'
            this.isShow = true;
        },
        //删除该用户
        deleteCar(row) {
            let _this = this;
            //弹出提示框
            _this.$confirm("注意：此操作将永久删除该登记车辆，是否继续？", "提示",
                {
                    confirmButtonText: "确认",
                    cancelIdleCallback: "取消",
                    type: "warning"
                }).then(() => {
                    //此处说明点击了‘确认’，开始进行删除
                    // let res =  reqDeleteUser(_this.token,row.id);
                    reqDeleteCar(_this.token, row.id).then(res => {
                        console.log(res);
                        if (res.code === 200) {
                            _this.$message({
                                type: "success",
                                message: "删除成功"
                            })
                            _this.getAllCar(_this.config.page)
                            return
                        }
                        _this.$message({
                            type: "error",
                            message: "删除失败"
                        })
                        return
                    })
                })
        },
        //获取所有的用户信息
        async getByKeyWord() {
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
            //开始查询
            console.log(_this.headerForm.selectItem)
            let tempArr=[];
            let res = await reqGetAllCar(_this.token);
            if(res.code===200){
                res.data.forEach(element => {
                    switch(_this.headerForm.selectItem){
                        case 'id':
                            if(element.id!=null){
                                let temp = element.id+'';
                                if(temp.indexOf(_this.headerForm.keyword+'')>=0){
                                    tempArr.push(element);
                                }
                            }break;
                        case 'owner':
                            if(element.owner!=null){
                                let temp = element.owner+'';
                                if(temp.indexOf(_this.headerForm.keyword+'')>=0){
                                    tempArr.push(element);
                                }
                            }break;
                        case 'all':
                            _this.getAllCar(1);
                        default: return;
                    }
                });
                _this.config.total=tempArr.length;
                _this.config.page=1;                //默认跳到第一页
                _this.tableData = [..._this.getTenCar(1,tempArr)];
            }
        },
        async lostFocus(){
            
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