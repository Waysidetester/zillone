import React from 'react';
import PropTypes from 'prop-types';
import authRequest from '../../helpers/data/authRequests';
import './addListing.scss';
import listingRequests from '../../helpers/data/listingRequests';

const defaultListing = {
  address: '',
  squareFootage: 0,
  price: 0,
  numBeds: 0,
  numBaths: 0,
  heating: '',
  cooling: '',
  imageUrl: '',
  uid: '',
};

class AddListing extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    newListing: defaultListing,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempListing = { ...this.state.newListing };
    tempListing[name] = e.target.value;
    this.setState({ newListing: tempListing });
  }

  // formFieldNumberState = (name, e) => {
  //   const tempListing = { ...this.state.newListing };
  //   tempListing[name] = e.target.value * 1;
  //   this.setState({ newListing: tempListing });
  // }

  addressChange = e => this.formFieldStringState('address', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myListing = { ...this.state.newListing };
    myListing.uid = authRequest.user();
    onSubmit(myListing);
    this.setState({ newListing: defaultListing });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.isEditing) {
      listingRequests.getSingleListing(this.props.editId)
        .then((listing) => {
          this.setState({ newListing: listing.data });
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const { newListing } = this.state;

    const title = () => {
      if (this.props.isEditing) {
        return <h2>Edit Listing</h2>;
      }
      return <h2>Add New Listing</h2>;
    };

    return (
      <div className="add-listing col">
        {title()}
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
            type="text"
            className="form-control"
            id="address"
            placeholder="123 Main St. City, State ZIPCODE"
            value={newListing.address}
            onChange={this.addressChange}
            />
          </div>
          <button className="btn btn-primary">Save Listing</button>
        </form>
      </div>
    );
  }
}

export default AddListing;
