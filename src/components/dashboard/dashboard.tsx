import { Component } from 'react';
import Notifications from './notifications';
import ProjectList from '../projects/projectList';
import { connect, ConnectedProps } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { RootState } from '../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state: RootState) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  } 
}

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>

class Dashboard extends Component<Props> {
  render() {
    const { projects, auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin'/>
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
          <ProjectList projects={projects}/>
            </div>
          <div className="col s12 m5 offset-m1">
          <Notifications />
          </div>
        </div>
      </div>
    )
  }
}

export default compose<React.FunctionComponent>(
  connector,
  firestoreConnect([
    { collection: 'projects' }
  ])
)(Dashboard);