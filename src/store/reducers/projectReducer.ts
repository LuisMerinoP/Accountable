export interface IProject {
  id: string,
  title: string,
  content: string
}

export interface IProjectState {
  projects: IProject[]
}

const initState: IProjectState = {
  projects: [
    {id: '1', title: 'help me find peach', content: 'blah blah blah'},
    {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
    {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
  ]
}

type Action = {
  type:string,
  project:IProject,
  err:unknown
}

const projectReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      console.log('created project', action.project)
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error', action.err);
      return state;
    default:
      return state;
  }
}

export default projectReducer;