import React from 'react';
import PropTypes from 'prop-types';
import listingShape from '../../helpers/props/listingShape';
import './listings.scss';

class Listings extends React.Component {
  static propTypes = {
    listings: PropTypes.arrayOf(listingShape),
  }

  render() {
    return (
      <div className="listings col">
        <h2>Listings</h2>
      </div>
    );
  }
}

export default Listings;
