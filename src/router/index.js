// 此处编写路由逻辑

//引入全局Vue
import Vue from "vue";
//引入VueRouter
import VueRouter from "vue-router";

//注册VueRouter
Vue.use(VueRouter)

//引入需要路由的页面：
import Home from '../pages/Home.vue'
import User from '../pages/User.vue'

//---------------------注意，此处必须写routes，不能写routers---------------------------
const routes = [            
    {
        path:'/',
        name:'Home',    
        component: Home     //这一项来自上方页面的引入
    },
    {
        path:'/user',
        name:'User',
        component:User
    }
]

const  router = new VueRouter({
    mode:'history', //路由匹配模式
    routes         //将路由表装入
})

//将路由的实例传出
export default router;
