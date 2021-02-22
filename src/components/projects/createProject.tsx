import { BaseSyntheticEvent, Component } from 'react'
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';

type Props = typeof firebase.auth & RouteComponentProps

class CreateProject extends Component<Props> {
  state = {
    title:'',
    content:''
  }

  handleChange = (e:BaseSyntheticEvent) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  createProject = (project:{title:string, content:string}) => {
    // make async call to database
    const db = firebase.firestore();
    db.collection('projects').add({
      ...project,
      authorFirstName: 'Net',
      authorLastName: 'Ninja',
      authorId: 12345,
      createdAt: new Date()
      }).then(() => {
        console.log('project created')
    }).catch((err:Error) => {
        console.log('project create error: ', err );
    })
  }

  handleSubmit = (e:BaseSyntheticEvent) => {
    e.preventDefault();//prevents the page from reloading
    this.createProject(this.state);
    this.props.history.push('/');
  }

  userStatus = { isUserLoggedIn: false};

  render() {
    const user = firebase.auth().currentUser;
    if (!user) return <Redirect to='/'/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create new project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form> 
      </div>
    )
  }
}



export default CreateProject;
