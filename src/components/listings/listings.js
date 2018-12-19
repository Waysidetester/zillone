import React from 'react';
import PropTypes from 'prop-types';
import ListingItem from '../listingItem/listingItem';
import listingShape from '../../helpers/props/listingShape';
import './listings.scss';

class Listings extends React.Component {
  static propTypes = {
    listings: PropTypes.arrayOf(listingShape),
    deleteSingleListing: PropTypes.func,
    passListingToEdit: PropTypes.func,
  }

  render() {
    const { listings, deleteSingleListing, passListingToEdit } = this.props;
    const listingsItemComponents = listings.map(listing => (
      <ListingItem
        key={listing.id}
        listing={listing}
        deleteSingleListing={deleteSingleListing}
        passListingToEdit={passListingToEdit}
      />
    ));
    return (
      <div className="listings col">
        <h2>Listings</h2>
        <ul>{listingsItemComponents}</ul>
      </div>
    );
  }
}

export default Listings;
