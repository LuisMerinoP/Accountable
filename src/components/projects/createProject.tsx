import { BaseSyntheticEvent, Component } from 'react'
import {connect} from 'react-redux';
import {createProject} from '../../store/actions/projectActions';

interface IExtendedProps {
  createProject: (state: {title:string, content:string} ) => {}
}

class CreateProject extends Component<IExtendedProps> {
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
    //console.log(this.state);
    this.props.createProject(this.state);
  }

  render() {
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

const mapDispatchToProps = (dispatch:any) => {
  return {
    createProject: (project: {title:string, content:string} ) => dispatch(createProject(project))
  }
}

export default connect(null, mapDispatchToProps)(CreateProject)
