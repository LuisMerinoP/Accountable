import firebase from 'firebase/app'
import { Dispatch } from 'react';
import { LoginAction, SignOutAction, SignUpAction, UserData } from './../types/authTypes';

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

export const signUp = (newUser: UserData) => {
  return (dispatch: Dispatch<SignUpAction>) => {
    //create user
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      return firebase.firestore().collection('users').doc(resp.user?.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      })
    }).then(()=> {
      dispatch({ type:'SIGNUP_SUCCESS'});
    }).catch((err) => {
      dispatch({ type:'SIGNUP_ERROR', err });
    });
  }
}