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
    <h3>{{title}}</h3>
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
        <el-menu-item :index="cItem.url" @click="clickChild(item,cItem)">
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
// import {mapState} from 'vuex'
// import {saveStore} from '@/util'
export default {
  data() {
    return {
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
          label:'维修管理',
          name: "RepairManage",
          icon: "el-icon-key",
          url: "4",
        },
        {
          label:'志愿者管理',
          name: "VolunteerManage",
          icon: "el-icon-s-check",
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
              label:'停车位管理',
              name: "ParkSpaceManage",
              icon: "el-icon-truck",
              url: "1_2",
            },
            {
              label:"停车记录管理",
              name: "LotManage",
              icon: "el-icon-truck",
              url: "1_3",
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
              label:'健康打卡信息',
              name: "AcidTest",
              icon: "el-icon-truck",
              url: "2_2",
            },
            {
              label:"核酸检测结果",
              name: "AbnormalTravel",
              icon: "el-icon-truck",
              url: "2_3",
            },
          ],
          url: "b",
        },
        {
          label:'论坛管理',
          name: 'ForumManage',
          icon: "el-icon-s-comment",
          child: [
            {
              label:"话题管理",
              name: "TopicManage",
              icon: "el-icon-s-comment",
              url: "3_1",
            },
            {
              label:"评论管理",
              name: "CommentManage",
              icon: "el-icon-s-comment",
              url: "3_2",
            },
          ],
          url: "c",
        },
      ],
    };
  },
  computed:{
    isCollapse(){
      return this.$store.state.tabs.isCollapse
    },
    title(){
      return this.isCollapse ? 'E-life' : 'E-life智能小区管理系统'
    }

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
    this.$store.commit('changeLocation',item.label)   //必须用同步，不能异步   
    this.$router.push({
      name:item.name
    })
   },
   clickChild(item,cItem){
    this.$store.commit('changeLocation',item.label+' / '+cItem.label)
    this.$router.push({
      name:cItem.name
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
    font-size: 100%;
     white-space: nowrap;     //进制字体换行
  }
}
</style>