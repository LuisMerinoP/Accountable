import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { IProject } from '../../store/types/projectTypes';

interface IExtendedProject extends IProject {
  authorFirstName: string,
  authorLastName: string,
  authorId: number,
  createdAt: Date
}

const ProjectDetails = (props:any) => {
  const project:IExtendedProject = props.project;
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
            <div>2n sept 2AM</div>
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

const mapStateToProps = (state:any, ownProps:any) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project: project
  }
}

export default compose<React.FunctionComponent>(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(ProjectDetails);