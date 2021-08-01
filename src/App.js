import React from 'react';
import Header from './components/Header';
import AllDrinks from './components/AllDrinks';
import Login from './components/Login';
import Profile from './components/Profile';
// import IsLoadingAndError from './IsLoadingAndError';
import { withAuth0 } from '@auth0/auth0-react';
import Footer from './components/Footer';
import MyFavDrinks from './components/MyFavDrinks';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css'

class App extends React.Component {

  render() {
    const {  isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}

              {isAuthenticated ? <AllDrinks /> : <Login />}
            </Route>

            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}

            <Route exact path="/favdrinks">
              <MyFavDrinks />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>

          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    )
  }
}

export default withAuth0(App);