<template>
    <div class="LogManage">
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

            <!-- <el-button type="primary" @click="addLog">+ 新增</el-button> -->
            <common-form :formLabel="headerFormLabel" :form="headerForm" :inline="true" @lostFocus="lostFocus"
                ref="form">
                <el-button type="primary" @click="getByKeyWord">搜索</el-button>
            </common-form>
        </div>
        <!-- 引入自定义的table组件 -->
        <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="changePage"
            @edit="editLog" @delete="deleteLog">
        </common-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonForm from '@/components/Common/Form.vue'
import CommonTable from '@/components/Common/Table.vue'
import { reqGetAllLog, reqUpdateLog, reqDeleteLog } from '@/api/index'
export default {
    name: 'LogManage',
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
                label: '序号',
                type: 'input'
            },
            {
                model: 'carNum',
                label: '车牌号',
                type: 'input'
            },
            {
                model: 'isRegistered',
                label: '是否有购买长期停车位',
                type: 'input'
            },
            {
                model: 'parkingNum',
                label: '停车位编号',
                type: 'input'
            },
            {
                model: 'start',
                label: '开始时间',
                type: 'input'
            },
            {
                model: 'end',
                label: '结束时间',
                type: 'input'
            },
            {
                model: 'totalPrice',
                label: '停车费',
                type: 'input'
            },
            ],
            operadeForm: {
                id: '',
                carNum: '',
                isRegistered: '',
                parkingNum: '',
                start: '',
                end: '',
                totalPrice: '',
            },
            headerFormLabel: [
                {
                    spaceHolder: '请选择搜索项',
                    model: 'selectItem',
                    type: 'select',
                    opts: [
                        {
                            value: 'carNum',
                            label: '车牌号'
                        },
                        {
                            value: 'parkingNum',
                            label: '停车位编码'
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
                    label: "序号",
                    width: 80
                },
                {
                    prop: "carNum",
                    label: "车牌号",
                    width: 100
                },
                {
                    prop: "isRegistered",
                    label: "是否有购买长期停车位",
                    width: 100
                },
                {
                    prop: "parkingNum",
                    label: "停车位编号",
                    width: 100
                },
                {
                    prop: "start",
                    label: "开始时间",
                    width: 200
                },
                {
                    prop: "end",
                    label: "结束时间",
                    width: 200
                },
                {
                    prop: "totalPrice",
                    label: "停车费",
                    width: 100
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
        this.getAllLog(1);
    },
    methods: {
        async confirm() {
            let _this = this;
            _this.isShow = false;
            if (_this.operateType === 'add') {          //此时新增一个用户
                // let res = await reqCreateParkSpace(_this.token, _this.operadeForm)
                // if (res.code === 200) {
                //     _this.$message({
                //         type: "success",
                //         message: "修改成功"
                //     })
                //     _this.getAllParkSpace(_this.config.page)
                //     return;
                // }
                // //否则，修改失败：
                // _this.$message({
                //     type: "error",
                //     message: "失败"
                // })
                // return;
            }
            //此时编辑一个用户
            let res = await reqUpdateLog(_this.token, _this.operadeForm)
            if (res.code === 200) {
                _this.$message({
                    type: "success",
                    message: "修改成功"
                })
                _this.getAllLog(_this.config.page)
                return;
            }
            //否则，修改失败：
            _this.$message({
                type: "error",
                message: "失败"
            })
        },
        // addParkSpace() {
        //     this.isShow = true;
        //     this.operateType = 'add';
        //     this.operadeForm = {
        //         id: '',
        //         car_num: '',
        //         type: ''
        //     }
        // },
        //获取所有10个停车位信息，并加载到表格内：
        async getAllLog(index) {
            let _this = this;
            let res = await reqGetAllLog(_this.token);
            if (res.code === 200) {             //此时请求成功
                res.data.forEach(element => {
                    element.isRegistered === '1' ? element.isRegistered='否' : element.isRegistered='否'
                });
                _this.config.total = res.data.length;
                _this.tableData = [..._this.getTenLog(index, res.data)];
            }
        },
        //每次从请求到的所有数组中去除10个停车位，提交给界面
        getTenLog(index, allLog) {
            let _this = this;
            if (index * 10 - 1 > _this.config.total) {
                return allLog.splice((index - 1) * 10, _this.config.total - (index - 1) * 10);
            }
            return allLog.splice((index - 1) * 10, 10);
        },
        //在表格内搜索
        changePage(page) {
            this.getAllLog(page)
        },
        //编辑用户信息
        editLog(row) {
            this.operadeForm = row;
            this.operateType = 'edit'
            this.isShow = true;
        },
        //删除该用户
        deleteLog(row) {
            let _this = this;
            //弹出提示框
            _this.$confirm("注意：此操作将永久删除该停车位，是否继续？", "提示",
                {
                    confirmButtonText: "确认",
                    cancelIdleCallback: "取消",
                    type: "warning"
                }).then(() => {
                    //此处说明点击了‘确认’，开始进行删除
                    // let res =  reqDeleteUser(_this.token,row.id);
                    reqDeleteLog(_this.token, row.id).then(res => {
                        console.log(res);
                        if (res.code === 200) {
                            _this.$message({
                                type: "success",
                                message: "删除成功"
                            })
                            _this.getAllLog(_this.config.page)
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
            let res = await reqGetAllLog(_this.token);
            if(res.code===200){
                res.data.forEach(element => {
                    switch(_this.headerForm.selectItem){
                        case 'carNum':
                            if(element.carNum!=null){
                                let temp = element.carNum+'';
                                if(temp.indexOf(_this.headerForm.keyword+'')>=0){
                                    element.isRegistered = '1' ? element.isRegistered='否' : element.isRegistered='是'
                                    tempArr.push(element);
                                }
                            }break;
                        case 'parkingNum':
                            if(element.parkingNum!=null){
                                let temp = element.parkingNum+'';
                                if(temp.indexOf(_this.headerForm.keyword+'')>=0){
                                    element.isRegistered = '1' ? element.isRegistered='否' : element.isRegistered='是'
                                    tempArr.push(element);
                                }
                            }break;
                        case 'all':
                            _this.getAllLog(1);
                        default: return;
                    }
                });
                _this.config.total=tempArr.length;
                _this.config.page=1;                //默认跳到第一页
                _this.tableData = [..._this.getTenLog(1,tempArr)];
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