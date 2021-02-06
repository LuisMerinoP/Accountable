//because this component is not going to have state
//then it can be a functional component instead of a class component

import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import M from 'materialize-css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './../../store/reducers/rootReducer';
import { Link } from 'react-router-dom';

const mapStateToProps = (state:RootState) => {
  return {
    auth: state.firebase.auth
  }
}

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

const NavBar = (props:Props) => {
  // $(document).ready(function(){
  $(function() {
    M.Sidenav.init($('.sidenav'));
  });
  const { auth } = props
  const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">   
        <Link to='/' className="brand-logo">Accountable</Link>
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

export default connector(NavBar);
