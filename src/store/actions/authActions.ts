import firebase from 'firebase/app'
import { Dispatch } from 'react';

interface AuthAction {
  type: string,
  err?: unknown
}



export const signIn = (credentials: {email:string, password:string}) => {
  return (dispatch: Dispatch<AuthAction>) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS'})
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err})
    });
  }
}