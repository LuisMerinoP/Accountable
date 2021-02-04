import { Component } from 'react';
import Notifications from './notifications';
import ProjectList from '../projects/projectList';
import { connect } from 'react-redux';
import { IProjectState } from '../../store/types/projectTypes';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Dashboard extends Component<IProjectState> {
  // async getMarker() {
  //   const snapshot = await firebase.firestore().collection('projects').get();
  //   return snapshot.docs.map(doc => doc.data());
  // }

  render() {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={this.props.projects}/>
            </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    projects: state.firestore.ordered.projects
  } 
}

export default compose<React.FunctionComponent>(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(Dashboard);

// const withPopulatedProjects = compose<React.FunctionComponent>(
//   firestoreConnect(props => [
//     {
//       collection:'projects',
//     },
//   ]),
//   connect((state:any, props) => ({
//     projects: state.firestore.ordered.projects
//   })),
// );

// export default withPopulatedProjects(Dashboard);