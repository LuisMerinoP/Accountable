
export const CREATE_PROJECT = 'CREATE_PROJECT'
export const CREATE_PROJECT_ERROR = 'CREATE_PROJECT_ERROR'
export const DELETE_PROJECT = 'DELETE_PROJECT'

export interface IProject {
  id: string,
  title: string,
  content: string
}

export interface IProjectState {
  projects: IProject[] | null
}

export interface CreateProjectAction {
  type: typeof CREATE_PROJECT | typeof CREATE_PROJECT_ERROR
  project?: {title:string, content:string}
  err?: Error
}

//TODO: pending delete project feature
interface DeleteProjectAction {
  type: typeof DELETE_PROJECT
  project: IProject,
  err?: Error
}

export interface IFirebaseProject {
  id: string,
  authorFirstName: string,
  authorId: string,
  authorLastName: string
  content: string
  createdAt: Date
  title: string
}

export type ProjectActionTypes = CreateProjectAction | DeleteProjectAction