//请求模块

import requests from "./request";
import externalAPI from "./external";

//通过账号进行登录
export const reqLoginByAccount=(userName,password)=>{
    return requests({
        url:'/user/login_by_account',
        method:'post',
        data: {
            userName,
            password
        }
    })
}

//获取已经登陆的账号
export const reqGetLoginAccount = (token) => {
    return requests({
        url:'/user/get_login_user',
        method: 'get',
        headers: {
            'Content-Type': 'application.json',
            token
        }
    })
}

//获取图片验证码
export const reqCaptcha = () => {
    return requests({
      url: '/user/captcha',
      method: 'get',
    })
  }

  //退出登录
  export const reqSignOut = (token) => {
    return requests({
      url: '/user/logout',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        token
      },
    })
  }

  //获取所有用户数据：
  export const reqGetAllUsers = (token) => {
    return requests({
      url: '/user/user_info',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        token
      },
    })
  }

//更新用户信息：
export const reqUpdateUser = (token,user) => {
  return requests({
    url: '/user/user_info',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data:user //前端直接是一个类，此处也用类,不可加大括号
  })
}

//删除用户                         ----------------
export const reqDeleteUser = (token,id) => {
  return requests({
    url: '/user/id',
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    params:{
      id
    } //前端直接是一个类，此处也用类,不可加大括号
  })
}

//新增用户信息：                    ------------------
export const reqCreateUser = (token,user) => {
  return requests({
    url: '/user/new_user',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data:user //前端直接是一个类，此处也用类,不可加大括号
  })
}
