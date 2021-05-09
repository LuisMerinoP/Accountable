import React, { BaseSyntheticEvent, Component } from 'react'
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import MaterializeDropdown from './MaterializeDropdown';
import FrequencySet from './frequencySet';
import { getProjectTypes } from './../../data/useProjectType'

type Props = typeof firebase.auth & RouteComponentProps

class CreateProject extends Component<Props> {
  state = {
    title:'',
    content:'',
    timeObjectiveLabelText:'Time Objective',
    projectTypeSelected: '0',
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

  onProjectTypeSelected = (selectedOPtion: string) => {
    this.setState({ projectTypeSelected: selectedOPtion});
    console.log(selectedOPtion, 'was selected!');
  }

  render() {
    const user = firebase.auth().currentUser;
    if (!user) return <Redirect to='/'/>
    let conditionalComponent:JSX.Element = <></>;
    if (this.state.projectTypeSelected === '0') {
      conditionalComponent = 
      <div className="input-field col s3">
        <label htmlFor="timeObjective">{this.state.timeObjectiveLabelText}</label>
        <FrequencySet clearLableCallback={this.clearLabel} />
      </div>;
    } else if (this.state.projectTypeSelected === '1') {
      conditionalComponent = 
      <div className="input-field col s3">
        <MaterializeDropdown options={['1', '2', '3', '4', '5']} placeholderText='number of hits'/>
      </div>;
    }
    
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create new project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} autoComplete="off"/>
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div className="row">
            <MaterializeDropdown options={getProjectTypes} placeholderText='Choose project type' onOptionSelect={this.onProjectTypeSelected}/>
          </div>
          <div className="row">
            {conditionalComponent}
            <div className="input-field col s1">
              <input type="text" id='labelInput' value='per' disabled/>
            </div>
            <div className="input-field col s2">
              <MaterializeDropdown options={['1', '2', '3', '4']} placeholderText='nº'/>
            </div>
            <div className="input-field col s6">
              <MaterializeDropdown options={['our', 'day', 'week', 'month']} placeholderText='Choose period'/>
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
