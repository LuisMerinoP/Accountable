import { Component } from 'react';
import Notifications from './notifications';
import ProjectList from '../projects/projectList';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

const mapStateToProps = (state: RootState) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  } 
}

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>

interface IFirebaseProject {
  id: string,
  authorFirstName: string,
  authorId: string,
  authorLastName: string
  content: string
  createdAt: Date
  title: string
}

interface InitDashboardState {
  firebaseProjects: IFirebaseProject[]
}

class Dashboard extends Component<Props> {
  _isMounted = false;
  async getFirebaseProjects() {
    const snapshot = await firebase.firestore().collection('projects').get();
    return snapshot.docs.map( (doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  state:InitDashboardState = {
    firebaseProjects: []
  }
  
  componentDidMount() {
    this._isMounted = true;
    this.getFirebaseProjects().then((resp) => {
      if (this._isMounted) {
        this.setState({
          firebaseProjects: resp
        });
        console.log(this.state.firebaseProjects);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { auth } = this.props;
    const projects = this.state.firebaseProjects.map(project => ({
      id: project.id,
      title: project.title,
      content: project.content
    }));
    console.log("rendered"); ;
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

export default connector(Dashboard);