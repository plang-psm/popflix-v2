import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import watchlistReducer from './watchlist/watchlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlists: watchlistReducer,
  },
});
