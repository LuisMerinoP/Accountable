import { Component } from 'react';
import Notifications from './notifications';
import ProjectList from '../projects/projectList';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import { IFirebaseProject } from '../../store/types/projectTypes';

const mapStateToProps = (state: RootState) => {
  return {
    //projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  } 
}

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;
type ExtendedProps = Props & { projects: IFirebaseProject[] | undefined }

class Dashboard extends Component<ExtendedProps> {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin'/>
    if (this.props.projects) {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
            <ProjectList projects={this.props.projects} /> 
              </div>
            <div className="col s12 m5 offset-m1">
            <Notifications />
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <p> Loading projects... </p>
        </div>
      )
    }
  }
}

export default connector(Dashboard);