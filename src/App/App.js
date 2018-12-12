import React, { Component } from 'react';
import connection from '../helpers/data/connection';
import Auth from '../components/auth/auth';
import Listings from '../components/listings/listings';
import MyNavbar from '../components/navbar/myNavbar';
import './App.scss';

class App extends Component {
  state = {
    authed: false,
  };

  componentDidMount() {
    connection();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  };

  render() {
    if (!this.state.authed) {
      return (
        <div className="App">
          <MyNavbar />
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar />
        <Listings />
      </div>
    );
  }
}

export default App;
