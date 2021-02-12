import { Component } from 'react';
import Notifications from './notifications';
import ProjectList from '../projects/projectList';
import { connect, ConnectedProps } from 'react-redux';
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
    const { auth } = this.props;
    console.log("rendered");
    if (!auth.uid) return <Redirect to='/signin'/>
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
          {/* projects={projects}/> */}
          <ProjectList /> 
            </div>
          <div className="col s12 m5 offset-m1">
          <Notifications />
          </div>
        </div>
      </div>
    )
  }
}

export default connector(Dashboard);