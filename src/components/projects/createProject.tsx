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
enum Modes { 
  EDIT_MODE = 'edit', 
  CREATE_MODE = 'create'
}
class CreateProject extends Component<Props> {
  state: { title: string; content: string; timeObjectiveLabelText: string; projectTypeSelected: string; };
  mode: Modes | null
  titleInputBoxRef: React.RefObject<HTMLInputElement>
  constentInputBoxRef: React.RefObject<HTMLInputElement>
  stateRef: { title: string; content: string; timeObjectiveLabelText: string; projectTypeSelected: string; } | null
  isInitStateSet: boolean
  constructor(props:Props) {
    super(props);
    this.state = {
      title: '',
      content:'',
      timeObjectiveLabelText:'Time Objective',
      projectTypeSelected: '0',
    }
    this.mode = null

    this.titleInputBoxRef = React.createRef();
    this.constentInputBoxRef = React.createRef()
    this.isInitStateSet = true
    this.stateRef = null // to check if state has changed before safe
  }

  isEdit() {
    return this.mode === Modes.EDIT_MODE
  }

  isCreate() {
    return this.mode === Modes.CREATE_MODE
  }

  componentDidMount() {
    const project:IProject = this.props.location.state as IProject;
    this.mode = project ? Modes.EDIT_MODE : Modes.CREATE_MODE;
    const title = this.isCreate() ? '' : project.title
    const content = this.isCreate() ? '' : project.content
    this.setState({ 
      timeObjectiveLabelText: this.isEdit() ? '00:00' : 'Time Objective',
      title,
      content
    })
    this.titleInputBoxRef.current!.value! = title
    this.constentInputBoxRef.current!.value! = content
  }

  componentDidUpdate(prevProps: Props, prevState: { title: string; content: string; timeObjectiveLabelText: string; projectTypeSelected: string; }) {
    if (this.isInitStateSet) { // shitty hack to track this.state ref change after its set in componentDidUpdate
      this.stateRef = this.state
      this.isInitStateSet = false
    }
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
    const displayName = user?.displayName?.split(' ')!
    const authorFirstName = displayName[0]
    const authorLastName = displayName[1]
    db.collection('projects').add({
      ...project,
      authorFirstName, // newUser.firstName + ' ' + newUser.lastName
      authorLastName,
      authorId: firebase.auth().currentUser?.uid,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date())
      }).then(() => {
        console.log('project created')
    }).catch((err:Error) => {
        console.log('project create error: ', err );
    })
  }

  updateProject = (id: string) => {
    try {
      const hasStateRefChanged = this.stateRef !== this.state
      if (hasStateRefChanged) {
        const db = firebase.firestore();  
        db.collection("projects").doc(id).update({
          content: this.state.content,
          title: this.state.title
        });
        this.props.history.push('/')
      } else { // nothing to update
        this.props.history.push('/')
      }
    } catch (error) {
        console.log(error);
    }
  }

  handleSubmit = (e:BaseSyntheticEvent) => {
    e.preventDefault();//prevents the page from reloading
    if (this.isCreate()) {
      const project = { title: this.state.title, content: this.state.content} 
      this.createProject(project);
      this.props.history.push('/');
    } else if (this.isEdit()) {
      const projectId = (this.props.location.state as IProject).id
      this.updateProject(projectId)
    } else {
      console.error('should be edit or create mode')
    }
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
        <label htmlFor="timeObjective" style={{ color: this.isEdit() ? 'black': ''}}>{this.state.timeObjectiveLabelText}</label>
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
          <h5 className="grey-text text-darken-3">{this.isCreate() ? 'Create new project' : 'Edit project'}</h5>
          <div className="input-field">
            <label htmlFor="title" className={this.isCreate() ? '' : 'active'}>Title</label>
            <input type="text" id="title" onChange={this.handleChange} autoComplete="off" ref={this.titleInputBoxRef}/>
          </div>
          <div className="input-field">
            <label htmlFor="content" className={this.isCreate() ? '' : 'active'}>Project Content</label>
            <input type="text" id="content" onChange={this.handleChange} autoComplete="off" ref={this.constentInputBoxRef}/>
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
            <button className="btn pink lighten-1 z-depth-0">{this.isCreate() ? 'CREATE' : 'SAVE'}</button>
          </div>
        </form> 
      </div>
    )
  }
}

export default CreateProject;
