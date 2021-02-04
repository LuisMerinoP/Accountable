import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from './../../store/actions/authActions'; 

const SignedInLinks = (props:any) => {
  return (
    <ul className="right">
      <li><NavLink to='/create'>New Project</NavLink></li>
      <li><NavLink to='#' onClick={props.signOut}>Log Out</NavLink></li>
      <li><NavLink to='/' className='btn btn-floating pink lighten-1'>LM</NavLink></li>
    </ul>
  )
}

const mapDispatchToPops = (dispatch:any) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToPops)(SignedInLinks);