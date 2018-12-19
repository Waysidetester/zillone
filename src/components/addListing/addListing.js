import React from 'react';
import './addListing.scss';

class AddListing extends React.Component {
  render() {
    return (
      <div className="add-listing col">
        <h2>Add Listing</h2>
        <form>
          <div className="form-group">
            <label for="address">Address:</label>
            <input
            type="text"
            className="form-control"
            id="address"
            placeholder="123 Main St. City, State ZIPCODE"
            />
          </div>
          <button className="btn btn-primary">Save Listing</button>
        </form>
      </div>
    );
  }
}

export default AddListing;
