import React, { BaseSyntheticEvent, Component } from 'react'
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import MaterializeDropdown from './MaterializeDropdown';
import FrequencySet from './frequencySet';
import { getProjectTypes } from './../../data/useProjectType'
import { IProject } from '../../store/types/projectTypes';

type Props = typeof firebase.auth & RouteComponentProps
class CreateProject extends Component<Props> {
  state: { title: string; content: string; timeObjectiveLabelText: string; projectTypeSelected: string; };
  constructor(props:Props) {
    super(props);
    this.state = {
      title:'',
      content:'',
      timeObjectiveLabelText:'Time Objective',
      projectTypeSelected: '0',
    }
  }

  componentDidMount() {
    const project:IProject = this.props.location.state as IProject;
    const isEditOrCreate = project ? 'edit' : 'create';
    this.setState({ 
      timeObjectiveLabelText: isEditOrCreate === 'edit' ? '00:00' : 'Time Objective'
    })
  }
 
  handleChange = (e:BaseSyntheticEvent) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  createProject = (project:{title:string, content:string }) => {
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
    const project = { title: this.state.title, content: this.state.content} 
    this.createProject(project);
    this.props.history.push('/');
  }

  clearLabel = () => {this.setState({ timeObjectiveLabelText: ''})};

  onProjectTypeSelected = (selectedOPtion: string) => {
    this.setState({ projectTypeSelected: selectedOPtion});
    console.log(selectedOPtion, 'was selected!');
  }

  render() {
    const project:IProject = this.props.location.state as IProject;
    const isEditOrCreate = project ? 'edit' : 'create';
    const user = firebase.auth().currentUser;
    if (!user) return <Redirect to='/'/>
    let conditionalComponent:JSX.Element = <></>;
    if (this.state.projectTypeSelected === '0') {
      conditionalComponent = 
      <div className="input-field col s3">
        {/* FIXME: pass time prop if edit */}
        <label htmlFor="timeObjective" style={{ color: isEditOrCreate === 'edit'? 'black': ''}}>{isEditOrCreate === 'edit' ? '00:00' : 'Time Objective'}</label>
        <FrequencySet clearLabelCallback={this.clearLabel}/>
      </div>;
    } else if (this.state.projectTypeSelected === '1') {
      conditionalComponent = 
      <div className="input-field col s3">
        <MaterializeDropdown options={['1', '2', '3', '4', '5']} placeholderText='number of hits' isEditOrCreate='create'/>
      </div>;
    }
    
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">{isEditOrCreate === 'create' ? 'Create new project' : 'Edit project'}</h5>
          <div className="input-field">
            <label htmlFor="title" className={isEditOrCreate === 'create' ? '' : 'active'}>Title</label>
            <input type="text" id="title" onChange={this.handleChange} autoComplete="off" value={isEditOrCreate === 'create' ? '' : project.title}/>
          </div>
          <div className="input-field">
            <label htmlFor="content" className={isEditOrCreate === 'create' ? '' : 'active'}>Project Content</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} value={isEditOrCreate === 'create' ? '' : project.title}></textarea>
          </div>
          <div className="row">
            <MaterializeDropdown options={getProjectTypes} placeholderText='Choose project type' onOptionSelect={this.onProjectTypeSelected} isEditOrCreate={isEditOrCreate} />
          </div>
          <div className="row">
            {conditionalComponent}
            <div className="input-field col s1">
              <input type="text" id='labelInput' value='per' disabled/>
            </div>
            <div className="input-field col s2">
              <MaterializeDropdown options={['1', '2', '3', '4']} placeholderText='nº' isEditOrCreate={isEditOrCreate}/>
            </div>
            <div className="input-field col s6">
              <MaterializeDropdown options={['our', 'day', 'week', 'month']} placeholderText='Choose period' isEditOrCreate={isEditOrCreate}/>
            </div>
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
