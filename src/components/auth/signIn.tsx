import React, { BaseSyntheticEvent, Component } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { ThunkDispatch  } from "redux-thunk";
import { RootState } from './../../store/reducers/rootReducer';

type AuthAction = {
  type:string,
  err?: unknown 
}

interface LoginCredentials {
  email: string;
  password: string;
}

const mapStateToProps = (state:RootState) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = ( dispatch: ThunkDispatch<any, never, AuthAction> ) => {
  return {
    signIn: (credentials: LoginCredentials) => dispatch(signIn(credentials))
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

class SignIn extends Component<Props> {
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

//export default connect<React.FunctionComponent>(mapStateToProps, mapDispatchToProps)(SignIn)
export default connector(SignIn);

