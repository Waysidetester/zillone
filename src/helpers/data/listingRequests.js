import axios from 'axios';
import apiKeys from './apiKeys';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getListings = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/listings.json`)
    .then((results) => {
      const listings = [];
      if (results.data !== null) {
        Object.keys(results.data).forEach((key) => {
          results.data[key].id = key;
          listings.push(results.data[key]);
        });
      }
      resolve(listings);
    })
    .catch(err => reject(err));
});

const deleteListing = listingId => axios.delete(`${baseUrl}/listings/${listingId}.json`);

const postRequest = listing => axios.post(`${baseUrl}/listings.json`, listing);

const getSingleListing = listingId => axios.get(`${baseUrl}/listings/${listingId}.json`);

const putRequest = (listingId, listing) => axios.put(`${baseUrl}/listings/${listingId}.json`, listing);

export default {
  getListings,
  deleteListing,
  postRequest,
  getSingleListing,
  putRequest,
};
