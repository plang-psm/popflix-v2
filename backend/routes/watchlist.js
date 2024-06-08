const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlist');
const { protect } = require('../middleware/auth');

router.get('/', protect, watchlistController.getWatchlists);
router.post('/addwatchlist', protect, watchlistController.addToWatchlist);
router.delete('/:id', protect, watchlistController.deleteWatchlistMovie);

module.exports = router;
