import { NavLink } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { signOut } from './../../store/actions/authActions';
import { FirebaseReducer } from 'react-redux-firebase'

const SignedInLinks = (props:WithPassedInProps) => {
  return (
    <ul className="right">
      <li><NavLink to='/create'>New Project</NavLink></li>
      <li><NavLink to='#' onClick={props.signOut}>Log Out</NavLink></li>
      <li><NavLink to='/' className='btn btn-floating pink lighten-1'>{props.profile.initials}</NavLink></li>
    </ul>
  )
}

const mapDispatchToPops = (dispatch:any) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

const connector = connect(null, mapDispatchToPops);
type Props = ConnectedProps<typeof connector>;
type WithPassedInProps = Props & { profile: FirebaseReducer.Profile<Record<string, any>>}

export default connector(SignedInLinks);