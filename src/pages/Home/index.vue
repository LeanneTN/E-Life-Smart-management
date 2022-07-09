<template>
  <el-row class="home" :gutter="20">
    <!--设置栅格的间距-->
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="userInfo">
          <img :src="img" />
          <div class="user">
            <p class="name">{{ loginAccount.userName }}</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <hr />
        <div>
          <p>上次登陆时间：<span>2022/07/07</span></p>
          <p>上次登陆地点：<span>湖南省长沙市</span></p>
        </div>
      </el-card>

      <el-card style="margin-top: 20px; height: 400px">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          :header-cell-style="{ fontSize:'17px'}"
        >
          <el-table-column prop="buildingNumber" label="楼栋" width="140">
          </el-table-column>
          <el-table-column prop="name" label="房间数量" width="140">
          </el-table-column>
          <el-table-column prop="address" label="已出售"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16" style="margin-top: 20px">
      <el-card style="width: 100%;height: 300px">
        <div style="height: 300px" ref="lineChart"></div>
      </el-card>
      <div class="graph">
      <el-card style="width: 45%;height: 100%" >
        <div style="height: 350px" ref="barChart"></div>
      </el-card>
      <el-card style="width: 45%;height: 100%">
        <div style="height: 350px" ref="pieChart"></div>
      </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { reqCaptcha, reqLoginByAccount } from "@/api/index";
import { mapState } from "vuex"; //引入Vuex，从而使用Store实现数据的存取
export default {
  name: "Home",
  data() {
    return {
      img: require("../../assets/logo.png"),
      tableData: [
        {
          buildingNumber: "A1",
          name: "40",
          address: "29",
        },
        {
          buildingNumber: "A2",
          name: "40",
          address: "30",
        },
        {
          buildingNumber: "A2",
          name: "40",
          address: "40",
        },
        {
          buildingNumber: "A2",
          name: "19",
          address: "30",
        },
        {
          buildingNumber: "B1",
          name: "35",
          address: "15",
        },
        {
          buildingNumber: "B2",
          name: "35",
          address: "34",
        },
      ],
      //折线图配置
      lineOption:{
         title:{
            text:'小区近七年住户职业走向',
            },
        series:[
        {
            name:'金融领域',                     //名字
            data:[70,75,60,90,87,88,90,86],     //七年的数据
            type:'line'                         //折线形式
        },
        {
            name:'电子领域',
            data:[30,28,50,55,80,140,142,1140],
            type:'line'
        },
        {
            name:'商业领域',
            data:[100,132,140,141,150,120,115,110],
            type:'line'
        },
        {
            name:'其他领域',
            data:[80,74,60,90,100,60,64,50],
            type:'line'
        }
      ],
        //X轴数据：
        xAxis:{
            type:'category',
            data:['2016','2017','2018','2019','2020','2021','2022']
        },
        //Y轴数据：
        yAxis:{
            name:'人',
            min:0,
            max:200,
            axisLine: {
          },
        },
        //顶部折现代表：
        legend:{
            data:['金融领域','电子领域','商业领域','其他领域']
        }
      },
      //柱状图配置
      barOption:{
        title:{
            text:'开支'
        },
        series:[
            {
                name:'人员工资',                     //名字
                data:[100,110,130,120,120,130,140,160],     //七年的数据
                type:'bar'   
            },
            {
                name:'设备维护',
                data:[60,69,73,70,60,80,85,90],     //七年的数据
                type:'bar'
            },
            {
                name:'其它支出',
                data:[31,40,38,42,45,57,50,55],     //七年的数据
                type:'bar'
            }
        ],
        //X轴数据：
        xAxis:{
            type:'category',
            data:['2018','2019','2020','2021','2022']
        },
        //Y轴数据：
        yAxis:{
            name:'百元',
            min:0,
            max:200,
        },
         //顶部折现代表：
        legend:{
            data:['人员工资','设备维护','其它支出']
        }
      },
      //饼状图配置
      pieOption:{
        title:{
            text:'小区土地使用',
            left:'center'
        },
        tooltip:{
            trigger:'item'
        },
        legend:{
            orient:'vertical',
            left:'left'
        },
        series:[
            {
                type:'pie',
                radius:'50%',
                data:[
                    {value:0.55,name:'居住用地'},
                    {value:0.15,name:'公共设施'},
                    {value:0.15,name:'绿化'},
                    {value:0.10,name:'湖水'},
                    {value:0.05,name:'其它'}
                ],
                emphasis:{
                    itemStyle:{
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      loginAccount: (state) => state.user.loginAccount,
    })
  },
  mounted(){
    //折线图
    const lineChart = this.$echarts.init(this.$refs.lineChart);
    lineChart.setOption(this.lineOption);

    //柱状图
    const barChart = this.$echarts.init(this.$refs.barChart);
    barChart.setOption(this.barOption)

    //饼状图
    const pieChart = this.$echarts.init(this.$refs.pieChart);
    pieChart.setOption(this.pieOption)
  }
  ,
  methods: {
    async getMsg() {
      console.log(this.loginAccount);
    },
    //为表格行设置颜色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1 || rowIndex === 5) {
        return "warning-row";
      } else if (rowIndex === 2) {
        return "success-row";
      }
      return "error-row";
    },
  },
};
</script>

<style lang="less">
.userInfo {
  display: flex;
  justify-content: space-evenly;

  img {
    height: 100px;
    width: 100;
    border-radius: 50%;
    background-color: #77ddff;
  }
}

.home {
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
}

.graph{
    width: 100%; 
    height: 340px;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

</style>