import React, { BaseSyntheticEvent, Component } from 'react'
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { ThunkDispatch } from "redux-thunk";

interface IWithDispatchedProps {
  signIn: (credentials: {email:string, password:string}) => void,
}

interface IWithStateProps extends IWithDispatchedProps {
  authError: string
}

class SignIn extends Component<IWithStateProps> {
  state = {
    email:'',
    password:''
  }

  handleChange = (e:BaseSyntheticEvent) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e:BaseSyntheticEvent) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  render() {
    const { authError } = this.props;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sing In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            <div className="red-text center">
              { authError ? <p>{authError}</p> : null }
            </div>
          </div>
        </form> 
      </div>
    )
  }
}

type AuthAction = {
  type:string,
  err?: unknown 
}

interface LoginCredentials {
  email: string;
  password: string;
}


const mapStateToProps = (state:any):any => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = ( dispatch: ThunkDispatch<any, never, AuthAction> ): IWithDispatchedProps => {
  return {
    signIn: (credentials: LoginCredentials) => dispatch(signIn(credentials))
  };
};

export default connect<React.FunctionComponent>(mapStateToProps, mapDispatchToProps)(SignIn)

