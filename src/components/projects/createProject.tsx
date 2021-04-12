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

  componentDidMount() {
    const dropdown = document.querySelector('.dropdown-trigger') as Element;
    M.Dropdown.init(dropdown, {
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      alignment: 'left', // Displays dropdown with edge aligned to the left of button 
      coverTrigger: false
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

  userStatus = {isUserLoggedIn: false};


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

          {/* <ul id="dropdown" className="dropdown-content">
            <li><a href="#!">EMPOWER YOUR BUSINESS!</a></li>
            <li className="divider"></li>
            <li><a href="#!">Services</a></li>
            <li className="divider"></li>
            <li><a href="#!">About</a></li>
            <li className="divider"></li>
            <li><a href="#!">Blog</a></li>
            <li className="divider"></li>
            <li><a href="#!">Contact</a></li>
          </ul>
          <ul className="dds">
            <li><a className="dropdown-trigger" data-target="dropdown" href="#!"> Dropdown <i className="material-icons">arrow_drop_down</i></a></li>
          </ul> */}


          <div className="input-field">
            <label htmlFor="title">Project type</label>
            <input type="text" id="type" onChange={this.handleChange}/>                  
          </div>
        
          {/* <!-- Dropdown Trigger --> */}
          <div>
            <a className='dropdown-trigger btn' href='#!' data-target='dropdown1'>Project type<i className="large material-icons" style={{lineHeight: 'initial'}}>arrow_drop_down</i></a>
          </div>
          
          {/* <!-- Dropdown Structure --> */}
          <ul id='dropdown1' className='dropdown-content'>
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li className="divider" tabIndex={-1}></li>
            <li><a href="#!">three</a></li>
            <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
            <li onClick={() => console.log('item selected!')}>
              <a href="#!">
                <i className="material-icons">cloud</i>five
              </a>
            </li>
          </ul>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form> 
      </div>
    )
  }
}

export default CreateProject;
