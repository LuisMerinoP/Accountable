import { Dispatch } from 'react';
import firebase from 'firebase/app';
import { CreateProjectAction, DeleteProjectAction, IFirebaseProject } from './../../store/types/projectTypes';

export const createProject = (project:{title:string, content:string}) => {
  return (dispatch:Dispatch<CreateProjectAction>) => {
    // make async call to database
    const db = firebase.firestore();
    db.collection('projects').add({
      ...project,
      authorFirstName: 'Net',
      authorLastName: 'Ninja',
      authorId: 12345,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date())
      }).then(() => {
      dispatch({ type:'CREATE_PROJECT', project});
    }).catch((err:Error) => {
      dispatch({ type:'CREATE_PROJECT_ERROR', err });
    })
  }
}

export const deleteProject = ( project: IFirebaseProject) => {
  return (dispatch:Dispatch<DeleteProjectAction>) => {
    // make async call to database
    const db = firebase.firestore();
    db.collection('projects')
      .doc(project.id)
      .delete()
      .then(() => {
      dispatch({ type:'DELETE_PROJECT', project });
    }).catch((err:Error) => {
      dispatch({ type: 'DELETE_PROJECT_ERROR', err })
    });
  }
}


