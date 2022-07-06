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
    <h3>E-life智能小区管理系统</h3>
    <el-menu-item v-for="item in noChildMenu" :index="item.url" :key="item.url">
      <i :class="item.icon"></i>
      <span slot="title">{{ item.name }}</span>
    </el-menu-item>

    <el-submenu v-for="item in childMenu" :index="item.url" :key="item.url">
      <template  slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </template>
      <el-menu-item-group  v-for="(cItem,cIndex) in item.child" :key="cItem.url">
        <el-menu-item :index="cIndex">
            {{cItem.name}}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- <el-submenu v-for="item in childMenu" :index="item.url" :key="item.url">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </template>
      <el-menu-item-group >
        <el-menu-item v-for="cItem in item.child" :index="cItem.url" :key="cItem.url">{{cItem.name}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>-->
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
          name: "首页",
          icon: "el-icon-s-home",
          url: "1",
        },
        {
          name: "用户管理",
          icon: "el-icon-user",
          url: "2",
        },
        {
          name: "缴费管理",
          icon: "el-icon-s-finance",
          url: "3",
        },
        {
          name: "论坛管理",
          icon: "el-icon-s-comment",
          url: "4",
        },
        {
          name: "维修管理",
          icon: "el-icon-key",
          url: "5",
        },
      ],
      childMenu: [
        {
          name: "停车管理",
          icon: "el-icon-truck",
          chlid: [
            {
              name: "车辆管理",
              icon: "el-icon-truck",
              url: "1_1",
            },
            {
              name: "车位管理",
              icon: "el-icon-truck",
              url: "1_2",
            },
          ],
          url: "a",
        },
        {
          name: "疫情管理",
          icon: "el-icon-orange",
          chlid: [
            {
              name: "健康打卡",
              icon: "el-icon-truck",
              url: "2_1",
            },
            {
              name: "核酸检测",
              icon: "el-icon-truck",
              url: "2_2",
            },
            {
              name: "异常出行",
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
    test(item) {
      console.log("点击事件发生");
      console.log(JSON.parse(item));
    },
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