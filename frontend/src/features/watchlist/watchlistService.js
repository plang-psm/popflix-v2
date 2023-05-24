import axios from 'axios';
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/watchlist`;

// Add to watchlist
const addToWatchlist = async (mediaData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + '/addwatchlist',
    mediaData,
    config
  );
  return response.data;
};

// Get user watchlist media
const getWatchlists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete media item
const removeFromWatchlist = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + '/' + id, config);
  return response.data;
};

const watchlistService = {
  addToWatchlist,
  getWatchlists,
  removeFromWatchlist,
};

export default watchlistService;
