import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import './auth.scss';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate()
      .then(() => {
        this.props.isAuthenticated();
      }).catch(err => console.error('auth error', err));
  }

  render() {
    return (
      <div className="Auth">
        <button
        className="btn btn-primary"
        onClick={this.authenticateUser}
        >Login With Google</button>
      </div>
    );
  }
}

export default Auth;
