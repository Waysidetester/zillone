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

export default { getListings };
