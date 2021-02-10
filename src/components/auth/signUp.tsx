import React, { BaseSyntheticEvent, Component } from 'react'
import { RootState } from '../../store/reducers/rootReducer';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';
import { UserData } from './../../store/types/authTypes'  

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const connector = connect(mapStateToProps, {signUp});
type Props = ConnectedProps<typeof connector>

class SignUp extends Component<Props> {
  state: UserData = {
    email:'',
    password:'',
    firstName:'',
    lastName:''
  }

  handleChange = (e:BaseSyntheticEvent) => {
    //set the local state to the component
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e:BaseSyntheticEvent) => {
    e.preventDefault();//prevents the page from reloading
    this.props.signUp(this.state);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' />
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sing Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            <div className="red-text center">
              { authError ? <p>{authError}</p> : null }
            </div>
          </div>
        </form> 
      </div>
    )
  }
}

export default connector(SignUp)
