import { BaseSyntheticEvent, Component } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { RootState } from '../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from "react-router-dom";

const mapDispatchToProps = (dispatch:any) => {
  return {
    createProject: (project: {title:string, content:string} ) => dispatch(createProject(project))
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.firebase.auth
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector> & RouteComponentProps

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

  handleSubmit = (e:BaseSyntheticEvent) => {
    e.preventDefault();//prevents the page from reloading
    this.props.createProject(this.state);
    this.props.history.push('/');
  }

  render() {
    const { auth } = this.props
    if (!auth.uid) return <Redirect to='/'/>
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

export default connector(CreateProject);
