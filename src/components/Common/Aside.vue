<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
  <!-- 一级菜单 -->
    <h3>E-life智能小区管理系统</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildMenu" :index="item.url" :key="item.url">
      <i :class="item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
<!-- 多级菜单 -->
    <el-submenu v-for="item in childMenu" :index="item.url" :key="item.url">
      <template  slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group   v-for="cItem in item.child" :key="cItem.url">
        <el-menu-item :index="cItem.url" @click="clickChild(cItem)">
          {{cItem.label}}
            <!-- {{cItem.label}} -->
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu> 
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: false, //默认展开多级菜单
      noChildMenu: [
        {
          label:'首页',
          name: "Home",
          icon: "el-icon-s-home",
          url: "1",
        },
        {
          label:'用户管理',
          name: "UserManage",
          icon: "el-icon-user",
          url: "2",
        },
        {
          label:'缴费管理',
          name: "PayManage",
          icon: "el-icon-s-finance",
          url: "3",
        },
        {
          label:'论坛管理',
          name: 'ForumManage',
          icon: "el-icon-s-comment",
          url: "4",
        },
        {
          label:'维修管理',
          name: "RepairManage",
          icon: "el-icon-key",
          url: "5",
        },
      ],
      childMenu: [
        {
          label:"停车管理",
          name: "ParkManage",
          icon: "el-icon-truck",
          child: [
            {
              label:'车辆管理',
              name: "CarManage",
              icon: "el-icon-truck",
              url: "1_1",
            },
            {
              label:"车位管理",
              name: "LotManage",
              icon: "el-icon-truck",
              url: "1_2",
            },
          ],
          url: "a",
        },
        {
          label:'疫情管理',
          name: "EpidemicManage",
          icon: "el-icon-orange",
          child: [
            {
              label:'健康打卡',
              name: "HealthCard",
              icon: "el-icon-truck",
              url: "2_1",
            },
            {
              label:'核酸检测',
              name: "AcidTest",
              icon: "el-icon-truck",
              url: "2_2",
            },
            {
              label:"异常出行",
              name: "AbnormalTravel",
              icon: "el-icon-truck",
              url: "2_3",
            },
          ],
          url: "b",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
   clickMenu(item){
    //防止连续点击
    let nowPath = window.location.href.substring(22);
    if(nowPath===item.name) return;
    this.$router.push({
      name:item.name
    })
   },
   clickChild(item){
    this.$router.push({
      name:item.name
    })
   }
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>