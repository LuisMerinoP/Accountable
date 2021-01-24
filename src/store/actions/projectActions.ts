import { Dispatch } from 'react';
import firebase from 'firebase/app';

type Action = {
  type:string,
  project?: {title:string, content:string}
  err?: unknown
}

export const createProject = (project:{title:string, content:string}) => {
  return (dispatch:Dispatch<Action>, getState:any) => {
    // make async call to database
    const db = firebase.firestore();
    db.collection('projects').add({
      ...project,
      authorFirstName: 'Net',
      authorLastName: 'Ninja',
      authorId: 12345,
      createdAt: new Date()
      }).then(() => {
      dispatch({ type:'CREATE_PROJECT', project});
    }).catch((err:unknown) => {
      dispatch({ type:'CREATE_PROJECT_ERROR', err })
    })
  }
}