// 此处编写路由逻辑

//引入全局Vue
import Vue from "vue";
//引入VueRouter
import VueRouter from "vue-router";

//注册VueRouter
Vue.use(VueRouter)

//引入需要路由的页面：
import Main from '../pages/Main.vue'
import Home from '../pages/Home'
import UserManage from '../pages/UserManage'
import PayManage from '../pages/PayManage'
import ForumManage from '../pages/ForumManage'
import RepairManage from '../pages/RepairManage'
import VolunteerManage from '../pages/VolunteerManage/index.vue'
import CarManage from '../pages/ParkManage/CarManage'
import LotManage from '../pages/ParkManage/LotManage'
import HealthCard from '../pages/EpidemicManage/HealthCard'
import AcidTest from '../pages/EpidemicManage/AcidTest'
import AbnormalTravel from '../pages/EpidemicManage/AbnormalTravel'
import Login from '@/pages/Login'


//---------------------注意，此处必须写routes，不能写routers---------------------------
const routes = [            
    {
        path:'/',
        name:'Main',    
        component: Main,     //这一项来自上方页面的引入
        redirect:'/Login',   //访问'/'界面时，默认跳转到登录页（后台管理系统无游客模式）
        children:[           //配置子路由
        {
            path:'/Home',
            name:'Home',
            component:Home
        },
        {
            path:'/UserManage',
            name:'UserManage',
            component:UserManage
        },
        {
            path:'/PayManage',
            name:'PayManage',
            component:PayManage
        },
        {
            path:'/ForumManage',
            name:'ForumManage',
            component:ForumManage
        },
        {
            path:'/RepairManage',
            name:'RepairManage',
            component:RepairManage
        },
        {
            path:'/VolunteerManage',
            name:'VolunteerManage',
            component:VolunteerManage
        },
        // 停车管理
        {
            path:'/ParkManage/CarManage',
            name:'CarManage',
            component:CarManage
        },
        {
            path:'/ParkManage/LotManage',
            name:'LotManage',
            component:LotManage
        },
        //疫情管理
        {
            path:'/EpidemicManage/HealthCard',
            name:'HealthCard',
            component:HealthCard
        },
        {
            path:'/EpidemicManage/AcidTest',
            name:'AcidTest',
            component:AcidTest
        },
        {
            path:'/EpidemicManage/AbnormalTravel',
            name:'AbnormalTravel',
            component:AbnormalTravel
        }
        ]
     },
     {
        path:'/Login',
        name:'Login',
        component:Login
     }
]

const router = new VueRouter({
    mode:'history', //路由匹配模式
    routes         //将路由表装入
})

//将路由的实例传出
export default router;
