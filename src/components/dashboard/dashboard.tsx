import { Component } from 'react';
import Notifications from './notifications';
import ProjectList from '../projects/projectList';
import { Redirect } from 'react-router-dom';
import useNotifications from './../../data/useNotifications';
import firebase from 'firebase/app';
import { INotification } from './../../../functions/src/index';
import { IFirebaseProject } from '../../store/types/projectTypes';

interface DashboardProps {
  projects: IFirebaseProject[] | undefined, //passed from above, required
  notifications?: INotification[] | undefined, //within-managed, optional
}

// dashboard wrapper to use the notifs hook in the dashboard class component
const withUseNotifsHookHOC = (Component: typeof Dashboard) => {
  return (props: DashboardProps) => { 
    //const user = firebase.auth().currentUser;
    if (!firebase.auth().currentUser) return <Redirect to='/signin' />;
    const notifications = useNotifications();
    return (<Component {...props} notifications={notifications} />);
  }
};

class Dashboard extends Component<DashboardProps> {
  render() {
    
    if (this.props.projects) {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
            <ProjectList projects={this.props.projects} />
              </div>
            <div className="col s12 m5 offset-m1">
            <Notifications notifications={this.props.notifications} />
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <p> Loading... </p>
        </div>
      )
    }
  }
}

export default withUseNotifsHookHOC(Dashboard);