n<template>
    <div class="app-container">
        <h1>小区登记车辆管理</h1>
        <el-row :gutter="40">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!-- <el-col :span="2">
                    <el-form-item label="车主ID">
                        <p>车主ID:</p>
                    </el-form-item>
                </el-col> -->
                <el-col :span="4">
                    <!-- <el-form-item label="车主ID"> -->
                    <el-form-item>
                        <el-input v-model="formInline.owner" placeholder="车主ID"></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="2">
                    <el-form-item label="车牌号">
                        <p>车牌号:</p>
                    </el-form-item>
                </el-col> -->
                <el-col :span="4">
                    <!-- <el-form-item label="车牌号"> -->
                    <el-form-item>
                        <el-input v-model="formInline.carid" placeholder="车牌号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <!-- <el-form-item label="车位"> -->
                    <el-form-item>
                        <p>是否有购买车位:</p>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-radio v-model="formInline.radio" label="1">是</el-radio>
                    <el-radio v-model="formInline.radio" label="2">否</el-radio>
                </el-col>

                <el-col :span="2">
                    <el-form-item>
                        <el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item>
                        <el-button @click="resetQuery" icon="el-icon-refresh">重置</el-button>
                    </el-form-item>
                </el-col>

            </el-form>
        </el-row>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate">修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
            </el-col>
            <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
        </el-row>

        <!--信息显示列表-->
        <el-table v-loading="loading" :data="carlist" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column lable="车牌号" prop="carid" width="120" />
            <el-table-column lable="车主ID" prop="owner" width="120" />
            <el-table-column lable="车主姓名" prop="owner_name" width="120" />
            <el-table-column lable="是否有购买停车位" prop="ispark" width="120" />
            <el-table-column lable="停车位编码" prop="parking_num" width="120" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="formInline.pageNum" :limit.sync="formInline.pageSize" @pagination="getList" />
    </div>
</template>

<script>
// import { METHODS } from 'http'
import { listCar } from '@/api/index'
// import { response } from 'express';
// import { mapState } from 'vuex'

export default {
    name: "Car",
    data() {
        return {
            //遮罩层
            loading: true,
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // //显示搜索条件
            // showSearch: true,
            //总条数
            total: 0,
            //车辆表格数据
            carlist: [],
            //查询参数
            formInline: {
                // pageNum: 1,
                // pageSize: 10,
                owner: undefined,
                carid: undefined,
                radio: '1'
            }
        }
    },
    created() {
        this.getList();
    },
    methods: {
        //得到车辆列表
        getList() {
            this.loading = true;
            listCar(this.formInline).then(response => {
                this.carlist = response.rows;
                this.total = response.total;
                this.loading = false;
            });
        },
        //查询按钮
        handleQuery() {
            console.log('submit!');
        },
        //重置按钮
        resetQuery() {
            console.log('reset');
        },
        //新增
        handleAdd() {
            console.log('handleAdd');
        },
        //修改
        handleUpdate() {
            console.log('handleUpdate');
        },
        //删除
        handleDelete() {
            console.log('handleDelete');
        },
        //导出
        handleExport() {
            console.log('handleExport');
        }
    }
}

</script>

<style>
.el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.el-radio {
    padding: 20px 0;
}

</style>