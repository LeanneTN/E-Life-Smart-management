import Vue from 'vue'
import Vuex from 'vuex'
import tabs from './tabs'           //多界面同时影响的配置信息
import user from './user'           //用户信息（包含token）
import createPersistedState from "vuex-persistedstate"          //避免刷新后数据消失

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tabs,
        user
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    //     reducer(val) {
    //         return {
    //         // 只储存state中的user
    //         token: val.user.token
    //       }
    //    }
    })]
})