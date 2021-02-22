import { IFirebaseProject } from '../../store/types/projectTypes';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import firebase from 'firebase/app';

const ProjectDetails = ({ project }: { project: IFirebaseProject }) => {
  if (!firebase.auth().currentUser) return <Redirect to='/'/>
  if (project) {
    return(
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>
              {project.content}
            </p>
          </div>
          <div className="card-action grey lighten-4">
            <div>{project.authorFirstName} {project.authorLastName}</div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
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