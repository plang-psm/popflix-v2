const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const mainRoutes = require('./routes/main');
const usersRoutes = require('./routes/users');
const watchlistRoutes = require('./routes/watchlist');

require('dotenv').config({ path: 'config.env' });

connectDB();

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use('/', mainRoutes);
app.use('/users', usersRoutes);
app.use('/watchlist', watchlistRoutes);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log('Server is running, you better catch it!');
});
