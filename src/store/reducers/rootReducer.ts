import authReducer from './authReducer';
import projectReducer, { IProjectState } from './projectReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'


export interface IAppState {
  //readonly auth: any,
  readonly project: IProjectState,
}

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer; 