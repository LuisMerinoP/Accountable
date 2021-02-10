export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'


export interface LoginAction {
  type: typeof LOGIN_SUCCESS | typeof LOGIN_ERROR,
  err?:Error
}

export interface SignOutAction {
  type: typeof SIGNOUT_SUCCESS,
  err?:Error
}

export interface SignUpAction {
  type: typeof SIGNUP_SUCCESS | typeof SIGNUP_ERROR,
  user?: UserData,
  err?:Error
}

export type AuthActionTypes = LoginAction | SignOutAction | SignUpAction

export interface UserData {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}