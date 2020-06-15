import request from '@/utils/request'

const userApi = {
  rout: '/route/route',

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
export function getRouter(parameter) {
  return request({
    url: userApi.rout,
    method: 'get',
    params: parameter
  })
}