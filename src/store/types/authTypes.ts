export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'

export interface LoginAction {
  type: typeof LOGIN_SUCCESS | typeof LOGIN_ERROR,
  err?:Error
}

export interface SignOutAction {
  type: typeof SIGNOUT_SUCCESS,
  err?:Error
}

export type AuthActionTypes = LoginAction | SignOutAction