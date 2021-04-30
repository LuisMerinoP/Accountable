import { BaseSyntheticEvent, Component } from 'react'
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import SelectProjectType from './selectProjectType';
import FrequencySet from './frequencySet';

type Props = typeof firebase.auth & RouteComponentProps

class CreateProject extends Component<Props> {
  state = {
    title:'',
    content:'',
    timeObjectiveLabelText:'Time Objective'
  }

  componentDidMount() {
    const select = document.querySelector('select') as Element;
    M.FormSelect.init(select, {
      dropdownOptions: {
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        alignment: 'left', // Displays dropdown with edge aligned to the left of button 
        coverTrigger: true
      }
    });
  }

  handleChange = (e:BaseSyntheticEvent) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  createProject = (project:{title:string, content:string}) => {
    // make async call to database
    const db = firebase.firestore();
    var user = firebase.auth().currentUser;
    db.collection('projects').add({
      ...project,
      authorFirstName: user?.displayName,
      // authorLastName: 'Ninja',
      authorId: firebase.auth().currentUser?.uid,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date())
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

  clearLabel = () => {this.setState({ timeObjectiveLabelText: ''})};

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
          <SelectProjectType/>
          <div className="input-field">
            <label htmlFor="timeObjective">{this.state.timeObjectiveLabelText}</label>
            <FrequencySet clearLableCallback={this.clearLabel} />
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
