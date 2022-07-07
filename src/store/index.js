import Vue from 'vue'
import Vuex from 'vuex'
import tabs from './tabs'           //多界面同时影响的配置信息
import user from './user'           //用户信息（包含token）

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tabs,
        user
    }
})