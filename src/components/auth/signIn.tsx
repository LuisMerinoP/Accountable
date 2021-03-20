import { BaseSyntheticEvent, Component } from 'react'
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

interface AuthState {
  authState: boolean,
  authError: string | null;
}

async function signIn (credentials: {email:string, password:string}): Promise<AuthState> {
  const authState = {} as AuthState ;
  await firebase.auth().signInWithEmailAndPassword(
    credentials.email,
    credentials.password
  ).then((response) => {
    if (response.user) {
      console.log('login succesful');
      authState.authState = true;
      authState.authError = null;
    } else {
      console.log('login error');
    }
  }).catch(err => {
    console.log(err);
    authState.authState = false;
    authState.authError = err;
  });

  return authState;
}

class SignIn extends Component {
  state = {
    email:'',
    password:'',
    authState: false,
    authError: ''
  }

  handleChange = (e:BaseSyntheticEvent) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = async (e:BaseSyntheticEvent) => {
    e.preventDefault();
    const authState = await signIn(this.state);
    this.setState({
      authState: authState.authState,
      authError: authState.authError?.toString()
    });
  }

  render() {
    if (this.state.authState) return <Redirect to='/'/>
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
              { this.state.authError ? <p>{this.state.authError}</p> : null }
            </div>
          </div>
        </form> 
      </div>
    )
  }
}

export default SignIn;

