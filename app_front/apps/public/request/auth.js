import fetch from '../utils/fetch'

export function GetVerifyCode (params) {
  return fetch.get(apis.AuthGetVerifyCode, { params })
}
export function AuthRegister (params) {
  return fetch.post(apis.AuthRegister, params)
}

