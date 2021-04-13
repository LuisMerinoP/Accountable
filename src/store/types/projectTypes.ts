import firebase from 'firebase/app';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const CREATE_PROJECT_ERROR = 'CREATE_PROJECT_ERROR';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const DELETE_PROJECT_ERROR = 'DELETE_PROJECT_ERROR';

export interface IProject {
  id: string,
  title: string,
  content: string
}

export interface IProjectState {
  projects: IProject[] | null
}

export type CreateProjectAction = {
  type: typeof CREATE_PROJECT | typeof CREATE_PROJECT_ERROR
  project?: {title:string, content:string}
  err?: Error
} 

export type DeleteProjectAction  = { 
  type: typeof DELETE_PROJECT, 
  project: IFirebaseProject 
} | { 
  type: typeof DELETE_PROJECT_ERROR, 
  err: Error 
}

export interface IFirebaseProject {
  id: string,
  authorFirstName: string,
  authorId: string,
  authorLastName: string
  content: string
  createdAt: firebase.firestore.Timestamp //firebase timestamp
  title: string
}

export type ProjectActionTypes = CreateProjectAction | DeleteProjectAction

//draft types

export enum ProyectType {
  time, //accumulated time
  hits, //accumulated hits
  value, //track of an average value, e.g weight
  results //description + results e.g crossfit results
}

export interface AccountableProjectBase {
  id: string,
  authorFirstName: string,
  authorId: string,
  authorLastName: string,
  content: string,
  createdAt: firebase.firestore.Timestamp, //firebase timestamp
  title: string,
  projectType: ProyectType
}