import { connect, ConnectedProps } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { IFirebaseProject } from '../../store/types/projectTypes';
import { RootState } from '../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import firebase from 'firebase/app';
import { useLocation } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";
import { createNotEmittedStatement } from 'typescript';
import { IframeHTMLAttributes } from 'react';

// const mapStateToProps = (state:RootState, ownProps:any) => {
//   const id = ownProps.match.params.id;
//   const projects = state.firestore.data.projects;
//   const project = projects ? projects[id] : null;
//   return {
//     project: project,
//     auth: state.firebase.auth    
//   }//
// }

// const connector = connect(mapStateToProps);
// type Props = ConnectedProps<typeof connector> 

// const ProjectDetails = ({ match }: RouteComponentProps<TParams>) => {
//type TParams = { id: string | undefined };


const ProjectDetails = ({ project }: { project: IFirebaseProject }) => {
  // const location = useLocation();
  // console.log(location.pathname)
  // const project = {
    
  //   id: 'cabrón',
  //   authorFirstName: 'Pablo',
  //   authorId: 'trialId',
  //   authorLastName: 'Merino',
  //   content: 'Mierda',
  //   createdAt: new firebase.firestore.Timestamp(0,0), //firebase timestamp
  //   title: 'dummy title'
    
  // }

  //const projectId = match.params.id;
  //console.log(props.state);
  //const project = props.state;
  if (!firebase.auth().currentUser) return <Redirect to='/'/>
  if (props.project) {
    return(
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{props.project.title}</span>
            <p>
              {props.project.content}
            </p>
          </div>
          <div className="card-action grey lighten-4">
            <div>{props.project.authorFirstName} {props.project.authorLastName}</div>
            <div>{moment(props.project.createdAt.toDate()).calendar()}</div>
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

// export default compose<React.FunctionComponent>(
//   connector,
//   firestoreConnect([
//     { collection: 'projects' }
//   ])
// )(ProjectDetails);
export default ProjectDetails;