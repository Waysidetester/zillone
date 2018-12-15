import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';
import Auth from '../components/auth/auth';
import Listings from '../components/listings/listings';
import MyNavbar from '../components/navbar/myNavbar';
import AddListing from '../components/addListing/addListing';
import Building from '../components/building/building';

import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
  state = {
    authed: false,
  };

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  };


  render() {
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!this.state.authed) {
      return (
        <div className="App">
          <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
          <div className="row">
            <Auth isAuthenticated={this.isAuthenticated}/>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
        <div className="row">
          <Listings />
          <Building />
        </div>
        <div className="row">
          <AddListing />
        </div>
      </div>
    );
  }
}

export default App;
