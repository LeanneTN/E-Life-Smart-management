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
    url: '/user/delete_user',
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

//新增用户信息：               
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

//获取车辆信息
export const reqGetAllCar = (token) => {
    return requests({
        url: '/parking/info/car',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            token
        }
    })
}

//新增车辆信息
export const reqCreateCar = (token, car) => {
  return requests({
      url: '/parking/car',
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          token
      },
      data: car
  })
}

//更新车辆信息
export const reqUpdateCar = (token, car) => {
  return requests({
      url: '/parking/car_info',
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          token
      },
      data: car
  })
}

//删除车辆信息
export const reqDeleteCar = (token, id) => {
  return requests({
      url: '/parking/delete_car',
      method: 'delete',
      headers: {
          'Content-Type': 'application/json',
          token
      },
      params:{
        id
      }
  })
}

//获取停车位信息
export const reqGetAllParkSpace = (token) => {
  return requests({
      url: '/parking/info/parking_space',
      method: 'get',
      headers: {
          'Content-Type': 'application/json',
          token
      }
  })
}

//新增停车位信息
export const reqCreateParkSpace = (token, parkingspace) => {
return requests({
    url: '/parking/parking_space',
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        token
    },
    data: parkingspace
})
}

//更新停车位信息
export const reqUpdateParkSpace = (token, parkingspace) => {
return requests({
    url: '/parking/parking_space_info',
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        token
    },
    data: parkingspace
})
}

//删除停车位信息
export const reqDeleteParkSpace = (token, id) => {
return requests({
    url: '/parking/delete_parking_space',
    method: 'delete',
    headers: {
        'Content-Type': 'application/json',
        token
    },
    params:{
      id
    }
})
}

//获取停车记录
export const reqGetAllLog = (token) => {
  return requests({
      url: '/parking/log',
      method: 'get',
      headers: {
          'Content-Type': 'application/json',
          token
      }
  })
}

//更新停车记录信息
export const reqUpdateLog = (token, parking) => {
return requests({
    url: '/parking/park_log',
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        token
    },
    data: parking
})
}

//删除停车记录
export const reqDeleteLog = (token, id) => {
return requests({
    url: '/parking/delete_park',
    method: 'delete',
    headers: {
        'Content-Type': 'application/json',
        token
    },
    params:{
      id
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

export const reqCreateAcid = (token,user) => {
  return requests({
    url: '/acid/insert_acid',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data:user //前端直接是一个类，此处也用类,不可加大括号
  })
}


export const reqGetAllHealthInfo= (token) => {
  return requests({
    url: '/acid/get_acid',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}


//获取所有缴费信息：
export const reqGetAllPayInfo= (token) => {
  return requests({
    url: '/payment/income',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}

export const reqGetVolunteer= (token) => {
  return requests({
    url: '/volunteer/get_volunteer',

    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}


//获取某个用户的支付信息：
// export const reqGetUserPayInfo= (token) => {
//   return requests({
//     url: '/payment/income',
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json',
//       token
//     },
//   })
// }

//新增订单
export const reqCreatePayment= (token,payment) => {
  return requests({
    url: '/payment/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data:payment
  })
}

//删除订单：
export const reqDeletePayment= (token,id) => {
  return requests({
    url: '/payment/',
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    params:{
      id
    }
  })
}

//更新订单信息（注意：payment的id必定不为空）
export const reqUpdatePayment= (token,payment) => {
  return requests({
    url: '/payment/',
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data:payment
  })
}

//获取所有的话题
export const reqGetAllTopic = (token) => {
  return requests({
    url: '/forum/topic',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}

export const reqCreateRepair= (token,repair) => {
  return requests({
    url: '/repair/sumbit',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data:repair
  })
}
export const reqUpdateRepair= (token,repairinfo) => {
  return requests({
    url: '/repair/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data:repairinfo
  })
}
export const reqGetAllRepairInfo= (token) => {
  return requests({
    url: '/repair/logs',

    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}

//新增话题
export const reqCreateTopic = (token, topic) => {
  return requests({
    url: '/forum/topic',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: topic
  })
}

//更新话题信息
export const reqUpdateTopic = (token, topic) => {
  return requests({
    url: '/forum/topic/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: topic
  })
}

//删除话题
export const reqDeleteTopic = (token, id) => {
  return requests({
    url: '/forum/topic',
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    params: {
      id
    }
  })
}

//获取所有的回帖
export const reqGetAllComment = (token) => {
  return requests({
    url: '/forum/comment',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      token
    }
  })
}

//新增
// export const reqCreateTopic = (token, topic) => {
//   return requests({
//     url: '/forum/topic',
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//       token
//     },
//     data: topic
//   })
// }

//更新回帖信息
export const reqUpdateComment = (token, comment) => {
  return requests({
    url: '/forum/comment/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: comment
  })
}

//删除回帖
export const reqDeleteComment = (token, id) => {
  return requests({
    url: '/forum/comment',
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    params: {
      id
    }
  })
}

