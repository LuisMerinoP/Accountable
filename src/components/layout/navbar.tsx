//because this component is not going to have state
//then it can be a functional component instead of a class component

import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import M from 'materialize-css';
import { connect } from 'react-redux';

const NavBar = (props:any) => {
  // $(document).ready(function(){
  $(function() {
    M.Sidenav.init($('.sidenav'));
  });
  const { auth } = props
  const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">   
        <a href="/" className="brand-logo">Accountable</a>
        <a href="/" className="sidenav-trigger" data-target="mobile-menu">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          {links}
        </ul>
        <ul className="sidenav grey lighten-2" id="mobile-menu">
         {links}
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = (state:any) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(NavBar);
