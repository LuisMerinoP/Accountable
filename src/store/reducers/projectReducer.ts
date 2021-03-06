import { ProjectActionTypes, IProjectState } from './../../store/types/projectTypes'

const initState: IProjectState = {
  projects: [
    {id: '1', title: 'help me find peach', content: 'blah blah blah'},
    {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
    {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
  ]
}

// interface CreateProjectAction {
//   type:string,
//   project:IProject,
//   err?:Error
// }

const projectReducer = (state = initState, action: ProjectActionTypes) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      console.log('created project', action.project);
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error', action.err);
      return state;
    case 'DELETE_PROJECT':
      console.log('deleted project', action.project)
      //TODO: REMOVE PROJECT FROM THE STATE
      return state;
    case 'DELETE_PROJECT_ERROR':
      console.log('delete project error', action.err);
      return state;

    default:
      return state;
  }
}

export default projectReducer;
