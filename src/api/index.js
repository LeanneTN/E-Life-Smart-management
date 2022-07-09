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

//获取车辆信息
export const listCar = (query) => {
    return requests({
        url: '/parking/info',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            query
        }
    })
}

export const reqGetAllHealth= (token) => {
  return requests({
    url: '/health/info',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}

export const healthCheckSubmit = (uid, temp,
  location, time,
  other_info, area_level, token) => {
  return requests({
    url: '/health/submit',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: {
      uid,
      temp,
      location,
      time,
      other_info,
      area_level
    }
  })
}

