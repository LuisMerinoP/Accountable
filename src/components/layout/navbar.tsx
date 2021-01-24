//because this component is not going to have state
//then it can be a functional component instead of a class component

import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import M from 'materialize-css';

const NavBar = () => {

  // $(document).ready(function(){
  $(function() {
    M.Sidenav.init($('.sidenav'));
  });

  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">   
        <a href="/" className="brand-logo">Accountable</a>
        <a href="/" className="sidenav-trigger" data-target="mobile-menu">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <SignedInLinks/>
          <SignedOutLinks />
        </ul>
        <ul className="sidenav grey lighten-2" id="mobile-menu">
          <SignedInLinks />
          <SignedOutLinks />
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;
