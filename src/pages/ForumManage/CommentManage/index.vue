<template>
    <div class="CommentManage">
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
            @edit="editComment" @delete="deleteComment">
        </common-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonForm from '@/components/Common/Form.vue'
import CommonTable from '@/components/Common/Table.vue'
import { reqGetAllComment, reqUpdateComment, reqDeleteComment } from '@/api/index'
export default {
    name: 'CommentManage',
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
                model: 'fromUser',
                label: '回复人',
                type: 'input'
            },
            {
                model: 'toId',
                label: '回复话题号',
                type: 'input'
            },
            {
                model: 'type',
                label: '回复类型',
                type: 'input'
            },
            {
                model: 'response',
                label: '浏览量',
                type: 'input'
            },
            {
                model: 'isReported',
                label: '是否被举报',
                type: 'select',
                opts: [
                    {
                        value: '1',
                        label: '是'
                    },
                    {
                        value: '0',
                        label: '否'
                    }
                ]
            },
            {
                model: 'isLandlord',
                label: '是否是楼主',
                type: 'select',
                opts: [
                    {
                        value: '1',
                        label: '是'
                    },
                    {
                        value: '0',
                        label: '否'
                    }
                ]
            },
            {
                model: 'content',
                label: '内容',
                type: 'input'
            },
            {
                model: 'time',
                label: '时间',
                type: 'input'
            },
            ],
            operadeForm: {
                id: '',
                fromUser: '',
                toId: '',
                type: '',
                isReported: '',
                response: '',
                isLandlord: '',
                content: '',
                time: '',
            },
            headerFormLabel: [
                {
                    spaceHolder: '请选择搜索项',
                    model: 'selectItem',
                    type: 'select',
                    opts: [
                        {
                            value: 'id',
                            label: '序号'
                        },
                        {
                            value: 'fromUser',
                            label: '回复人'
                        },
                        {
                            value: 'toId',
                            label: '话题号'
                        },
                        {
                            value: 'type',
                            label: '回复类型'
                        },
                        {
                            value: 'isReported',
                            label: '是否被举报'
                        },
                        {
                            value: 'response_min',
                            label: '浏览量>='
                        },
                        {
                            value: 'response_max',
                            label: '浏览量<'
                        },
                        {
                            value: 'all',
                            label: '所有评论'
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
                    prop: "fromUser",
                    label: "回复人",
                    width: 100
                },
                {
                    prop: "toId",
                    label: "话题号",
                    width: 100
                },
                {
                    prop: "type",
                    label: "类型",
                    width: 100
                },
                {
                    prop: "isReported",
                    label: "是否被举报",
                    width: 100
                },
                {
                    prop: "response",
                    label: "浏览量",
                    width: 100
                },
                {
                    prop: "isLandlord",
                    label: "是否是楼主",
                    width: 100
                },
                {
                    prop: "content",
                    label: "内容",
                    width: 100
                },
                {
                    prop: "time",
                    label: "时间",
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
        this.getAllComment(1);
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
            let res = await reqUpdateComment(_this.token, _this.operadeForm)
            if (res.code === 200) {
                _this.$message({
                    type: "success",
                    message: "修改成功"
                })
                _this.getAllComment(_this.config.page)
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
        async getAllComment(index) {
            let _this = this;
            let res = await reqGetAllComment(_this.token);
            if (res.code === 200) {             //此时请求成功
                res.data.forEach(element => {
                    element.isReported === '1' ? element.isReported='是' : element.isReported='否';
                    element.isLandlord === '1' ? element.isLandlord='是' : element.isLandlord='否';
                });
                _this.config.total = res.data.length;
                _this.tableData = [..._this.getTenComment(index, res.data)];
            }
        },
        //每次从请求到的所有数组中去除10个停车位，提交给界面
        getTenComment(index, allLog) {
            let _this = this;
            if (index * 10 - 1 > _this.config.total) {
                return allLog.splice((index - 1) * 10, _this.config.total - (index - 1) * 10);
            }
            return allLog.splice((index - 1) * 10, 10);
        },
        //在表格内搜索
        changePage(page) {
            this.getAllComment(page)
        },
        //编辑用户信息
        editComment(row) {
            this.operadeForm = row;
            this.operateType = 'edit'
            this.isShow = true;
        },
        //删除该用户
        deleteComment(row) {
            let _this = this;
            //弹出提示框
            _this.$confirm("注意：此操作将永久删除该评论，是否继续？", "提示",
                {
                    confirmButtonText: "确认",
                    cancelIdleCallback: "取消",
                    type: "warning"
                }).then(() => {
                    //此处说明点击了‘确认’，开始进行删除
                    // let res =  reqDeleteUser(_this.token,row.id);
                    reqDeleteComment(_this.token, row.id).then(res => {
                        console.log(res);
                        if (res.code === 2) {
                            _this.$message({
                                type: "success",
                                message: "删除成功"
                            })
                            _this.getAllComment(_this.config.page)
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
            let res = await reqGetAllComment(_this.token);
            if(res.code===200){
                res.data.forEach(element => {
                    switch(_this.headerForm.selectItem){
                        case 'id':
                            if(element.id!=null){
                                let temp = element.id+'';
                                if(temp.indexOf(_this.headerForm.keyword+'')>=0){
                                    element.isReported === '1' ? element.isReported='是' : element.isReported='否';
                                    element.isLandlord === '1' ? element.isLandlord='是' : element.isLandlord='否';
                                    tempArr.push(element);
                                }
                            }break;
                        case 'fromUser':
                            if(element.fromUser!=null){
                                let temp = element.fromUser+'';
                                if(temp.indexOf(_this.headerForm.keyword+'')>=0){
                                    element.isReported === '1' ? element.isReported='是' : element.isReported='否';
                                    element.isLandlord === '1' ? element.isLandlord='是' : element.isLandlord='否';
                                    tempArr.push(element);
                                }
                            }break;
                        case 'toId':
                            if(element.toId!=null){
                                let temp = element.toId+'';
                                if(temp.indexOf(_this.headerForm.keyword+'')>=0){
                                    element.isReported === '1' ? element.isReported='是' : element.isReported='否';
                                    element.isLandlord === '1' ? element.isLandlord='是' : element.isLandlord='否';
                                    tempArr.push(element);
                                }
                            }break;
                        case 'type':
                            if(element.type!=null){
                                let temp = element.type+'';
                                if(temp.indexOf(_this.headerForm.keyword+'')>=0){
                                    element.isReported === '1' ? element.isReported='是' : element.isReported='否';
                                    element.isLandlord === '1' ? element.isLandlord='是' : element.isLandlord='否';
                                    tempArr.push(element);
                                }
                            }break;
                        case 'isReported':
                            if (element.isReported != null) {
                                element.isReported === '1' ? element.isReported='是' : element.isReported='否';
                                element.isLandlord === '1' ? element.isLandlord='是' : element.isLandlord='否';
                                let temp = element.isReported + '';
                                if (temp.indexOf(_this.headerForm.keyword + '') >= 0) {
                                    tempArr.push(element);
                                }
                            } break;
                        case 'response_min':
                            if (element.response != null) {
                                let temp = element.response + '';
                                if (element.response >= _this.headerForm.keyword) {
                                    element.isLandlord === '1' ? element.isLandlord='是' : element.isLandlord='否';
                                    element.isReported === '1' ? element.isReported = '是' : element.isReported = '否'
                                    tempArr.push(element);

                                }
                            } break;
                        case 'response_max':
                            if (element.response != null) {
                                let temp = element.response + '';
                                if (element.response < _this.headerForm.keyword) {
                                    element.isLandlord === '1' ? element.isLandlord='是' : element.isLandlord='否';
                                    element.isReported === '1' ? element.isReported = '是' : element.isReported = '否'
                                    tempArr.push(element);

                                }
                            } break;
                        case 'all':
                            _this.getAllComment(1);
                        default: return;
                    }
                });
                _this.config.total=tempArr.length;
                _this.config.page=1;                //默认跳到第一页
                _this.tableData = [..._this.getTenComment(1,tempArr)];
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