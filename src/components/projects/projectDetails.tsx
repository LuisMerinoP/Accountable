
import { Redirect, useParams } from 'react-router-dom';
import moment from 'moment';
import { useEffect, useState } from 'react'; 
import Toggle from '../toggle/toggle';
import { IFirebaseProject } from '../../store/types/projectTypes';
import firebase from 'firebase/app';
import useProject from '../../data/useProject';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>(); 
  const project = useProject(id ?? "");
  const [stateProject, setStateProject] = useState<IFirebaseProject | undefined>(project);
  
  useEffect(() => {
    setStateProject(project);
  }, [project]);

  //toggle dummy trial
  const [active, setActive] = useState(false);
  let projectActiveString = 'Project Active: ' + active.toString().toUpperCase(); 

  if (!firebase.auth().currentUser) return <Redirect to='/'/>
  if (stateProject) {
    return(
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{stateProject.title}</span>
            <p>
              {stateProject.content}
            </p>
          </div>
          <div className="card-action grey lighten-4">
            <div>{stateProject.authorFirstName} {stateProject.authorLastName}</div>
            <div>{moment(stateProject.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
        <div>
          <Toggle id='active' checked={active} onChange={setActive}/>
          <label> {projectActiveString} </label>
        </div>
      </div>
    )
  } else {
    return(
      <div>
        <p> Loading project... </p>
      </div>
    )
  }
}

export default ProjectDetails;