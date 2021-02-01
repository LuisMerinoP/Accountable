const initState = {
  authError: null
};

interface AuthAction {
  type:string,
  err?:unknown
}
const authReducer = (state = initState, action:AuthAction) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error!')
      return {
        ...state,
        authError: 'Login failed'
      }
    case 'LOGIN_SUCCESS':
      console.log('login success!')
      return {
        ...state,
        authError: null
      }
    default:
      return state
  }
}

export default authReducer;