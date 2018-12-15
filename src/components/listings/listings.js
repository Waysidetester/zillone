import React from 'react';
import PropTypes from 'prop-types';
import ListingItem from '../listingItem/listingItem';
import listingShape from '../../helpers/props/listingShape';
import './listings.scss';

class Listings extends React.Component {
  static propTypes = {
    listings: PropTypes.arrayOf(listingShape),
  }

  render() {
    const { listings } = this.props;
    const listingsItemComponents = listings.map(listing => (
      <ListingItem
        key={listing.id}
        listing={listing}
      />
    ));
    return (
      <div className="listings col">
        <h2>Listings</h2>
        {listingsItemComponents}
      </div>
    );
  }
}

export default Listings;
