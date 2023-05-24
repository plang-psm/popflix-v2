const Watchlist = require('../models/Watchlist');
const asyncHandler = require('express-async-handler');

// @desc    Get user watchlists
// @route   GET /watchlists
// @access  Private
const getWatchlists = asyncHandler(async (req, res) => {
  const watchlist = await Watchlist.find({ user: req.user._id });
  res.status(200).json(watchlist);
});

// @desc    Add new movie
// @route   POST /addwatchlist
// @access  Private
const addToWatchlist = asyncHandler(async (req, res) => {
  const { image, title, mediaId, type, user } = req.body;

  // Find if user, title already exists
  const watchlistExists = await Watchlist.findOne({ title, user });
  if (watchlistExists) {
    res.status(400);
    throw new Error('Movie already in watchlist');
  }

  if (!image || !title) {
    res.status(400);
    throw new Error('Please add a image and title');
  }

  const watchlist = await Watchlist.create({
    image,
    title,
    mediaId,
    type,
    user: req.user.id,
  });
  res.status(201).json(watchlist);
});

// @desc    Delete movie
// @route   DELETE /deletewatchlist/:id
// @access  Private
const deleteWatchlistMovie = asyncHandler(async (req, res) => {
  const watchlist = await Watchlist.findById(req.params.id);
  if (!watchlist) {
    res.status(404);
    throw new Error('Movie not found');
  }

  if (watchlist.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await watchlist.deleteOne();

  res.status(200).json({ success: true });
});

module.exports = {
  getWatchlists,
  addToWatchlist,
  deleteWatchlistMovie,
};
