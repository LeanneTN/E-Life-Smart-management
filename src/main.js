import Vue from 'vue'
import App from './App.vue'

/* 从全局导入elementUI组件
 import ElementUI from 'element-ui'*/
import 'element-ui/lib/theme-chalk/index.css'
import{Button,Input,Container,Aside,Header,Main,
       Menu,Submenu,MenuItemGroup,MenuItem} from  'element-ui';

//从自己创建的./router文件下引入路由
import router from './router'

//关闭生产提示
Vue.config.productionTip = false

/*将ElementUI全部注入Vue（体量过大，不推荐）
 Vue.use(ElementUI);*/
//按需使用Button组件
// Vue.component(Button.name, Button);   //这是注册全局组件的操作
Vue.use(Button)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

// Vue.use(Button);

new Vue({
  router,               //配置路由
  render: h => h(App),
}).$mount('#app')
