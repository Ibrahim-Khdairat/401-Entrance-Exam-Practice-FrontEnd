import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';

import LoginButton from './buttons/LoginButton';
import LogoutButton from './buttons/LogoutButton';

import './Header.css';

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;

    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Best Drinks</Navbar.Brand>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/favdrinks">My Fav. Drinks</Link>


         
          {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
          {isAuthenticated ? <LogoutButton/> : <LoginButton/>}

      </Navbar>
    )
  }
}

export default withAuth0(Header);