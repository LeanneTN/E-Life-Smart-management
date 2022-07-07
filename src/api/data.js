import axios from "./axios";

export const Login = (param)=>{
    return axios.request({
        url:'/api/user/login_by_account',
        method:'post',
        data:param
    })
}