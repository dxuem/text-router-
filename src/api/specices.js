
/** 
 * descript:科类管理请求
 * author：dxuem
 * createDate：2020-05-29
**/
import request from '@/utils/request'

// const userApi = {
//   Login: '/login',
//   Logout: '/specices/logout',
//   ForgePassword: '/specices/forge-password',
//   Register: '/specices/register',
//   twoStepCode: '/specices/2step-code',
//   SendSms: '/vcode',
//   SendSmsErr: '/account/sms_err',
//   // get my info
//   UserInfo: '/userinfo',
//   UserMenu: '/user/nav'
// }

// 物种模块mock
const specicesApi = {
  super: '/specices/superT',//上级类别
  Logout: '/specices/logout',
  ForgePassword: '/specices/forge-password',
  Register: '/specices/register',
  twoStepCode: '/specices/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
// 上级类别查询  参数（当前类别id）
export function superT (parameter) {
  return request({
    url: specicesApi.super,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 获取验证码
export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'get',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 获取用户信息
export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}