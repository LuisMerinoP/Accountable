import firebase from 'firebase/app'
import { Dispatch } from 'react';
import { LoginAction, SignOutAction } from './../types/authTypes';

export const signIn = (credentials: {email:string, password:string}) => {
  return (dispatch: Dispatch<LoginAction>) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS'});
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err});
    });
  }
}

export const signOut = () => {
  return (dispatch: Dispatch<SignOutAction>) => {
    firebase.auth().signOut().then(()=> {
      dispatch({ type: 'SIGNOUT_SUCCESS'});
    })
  }
}