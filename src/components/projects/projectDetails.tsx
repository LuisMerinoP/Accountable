import { connect, ConnectedProps } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { IFirebaseProject } from '../../store/types/projectTypes';
import { RootState } from '../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const mapStateToProps = (state:RootState, ownProps:any) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: state.firebase.auth    
  }
}

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector> 

const ProjectDetails = (props:Props) => {
  const project:IFirebaseProject = props.project;
  const { auth } = props
  if (!auth.uid) return <Redirect to='/'/>
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

export default compose<React.FunctionComponent>(
  connector,
  firestoreConnect([
    { collection: 'projects' }
  ])
)(ProjectDetails);