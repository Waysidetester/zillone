import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';
import Auth from '../components/auth/auth';
import Listings from '../components/listings/listings';
import MyNavbar from '../components/navbar/myNavbar';
import AddListing from '../components/addListing/addListing';
import Building from '../components/building/building';
import listingRequests from '../helpers/data/listingRequests';

import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
  state = {
    authed: false,
    listings: [],
    isEditing: false,
    editId: '-1',
  };

  componentDidMount() {
    connection();

    listingRequests.getListings()
      .then((listings) => {
        this.setState({ listings });
      })
      .catch(err => console.error(err));

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

  deleteOne = (listingId) => {
    listingRequests.deleteListing(listingId)
      .then(() => {
        listingRequests.getListings()
          .then((listings) => {
            this.setState({ listings });
          });
      });
  }

  formSubmitEvent = (newListing) => {
    console.log(newListing);
    listingRequests.postRequest(newListing)
      .then(() => {
        listingRequests.getListings()
          .then((listings) => {
            this.setState({ listings });
          });
      })
      .catch(err => console.error(err));
  }

  passListingToEdit = (listingId) => this.setState({ isEditing: true, editId: listingId });

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
          <Listings
            listings={this.state.listings}
            deleteSingleListing={this.deleteOne}
            passListingToEdit={this.passListingToEdit}
          />
          <Building />
        </div>
        <div className="row">
          <AddListing
          onSubmit={this.formSubmitEvent}
          isEditing={this.state.isEditing}
          editId={this.state.editId}
          />
        </div>
      </div>
    );
  }
}

export default App;
