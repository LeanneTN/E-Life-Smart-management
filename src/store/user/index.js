import {reqLoginByAccount,reqGetLoginAccount} from '@/api'

//User模块的store
const state = {
    token:'',       //令牌
    loginAccount:null   //当前登录用户的信息，未登录则为null
};

// 用来唯一修改state中的值的方法
const mutations = {
    LOGINACCOUNT(state,loginAccount){
        state.loginAccount=loginAccount;
    },
    TOKEN(state,token){                 //使用方法：this.$store.commit('TOKEN',{token:'abc})
        state.token=token;
    }
    // test(state,loginAccount){
    //     state.loginAccount=loginAccount;
    // }
};

const actions = {
    //获取token
    token(context,token){
        context.commit('TOKEN',token);
    },
    //向服务器请求已经登陆的账号
    async loginAccount(context,token){
        let res = await reqGetLoginAccount(token);
        if(res.code == 200){
            context.commit('LOGINACCOUNT',res.data)
        }
    },
    //更新账号信息：
    async changeLoginAccount(context,loginAccount){
            context.commit('LOGINACCOUNT',loginAccount)
    },

};

const getters = {};

//暴露出的接口
export default  {
    state,
    mutations,
    actions,
    getters
}