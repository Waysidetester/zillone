import React from 'react';
import './listingItem.scss';

class ListingItem extends React.Component {
  render() {
    const { listing } = this.props;
    return (
      <h4>{listing.address}</h4>
    );
  }
}

export default ListingItem;
