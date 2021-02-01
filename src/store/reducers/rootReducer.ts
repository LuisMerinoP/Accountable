import authReducer from './authReducer';
import projectReducer, { IProjectState } from './projectReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'


// export interface IAppState {
//   readonly auth: typeof authReducer,
//   readonly project: typeof projectReducer,
//   readonly firebase: typeof firebaseReducer,
//   readonly firestore: typeof firestoreReducer
// }

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer; 