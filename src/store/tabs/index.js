export default{
    state:{
        isCollapse:false          //控制侧边栏是否展开
    },
    mutations:{
        changeCollapse(state){
            state.isCollapse = !state.isCollapse
        }
    }
}