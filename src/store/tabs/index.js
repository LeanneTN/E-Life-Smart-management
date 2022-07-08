const state = {
    isCollapse:false,           //控制侧边栏是否展开
    location:'首页'             //展示当前所处的页面，默认处于首页
}

const mutations = {
    changeCollapse(state){
        state.isCollapse = !state.isCollapse
    },
    changeLocation(state,location){
        state.location = location
    }
}

export default {
    state,
    mutations
}