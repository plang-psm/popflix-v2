const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const usersRoutes = require('./routes/users');
const watchlistRoutes = require('./routes/watchlist');

require('dotenv').config({ path: 'config.env' });

connectDB();

app.use(
  cors({
    origin: ['https://popfliix.vercel.app', 'http://localhost:3000'],
  }),
);
// app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use('/users', usersRoutes);
app.use('/watchlist', watchlistRoutes);

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
  });
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Popflix' });
  });
}

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log('Server is running, you better catch it!');
});
