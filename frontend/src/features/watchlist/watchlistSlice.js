import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../util/utils';
import watchlistService from './watchlistService';

const initialState = {
  watchlists: [],
  isLoading: false,
};

// Add media to watchlist
export const addToWatchlist = createAsyncThunk(
  'watchlist/addwatchlist',
  async (mediaData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await watchlistService.addToWatchlist(mediaData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Get user watchlist media
export const getWatchlists = createAsyncThunk(
  'watchlists/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await watchlistService.getWatchlists(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Delete media
export const removeFromWatchlist = createAsyncThunk(
  'watchlists/remove',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await watchlistService.removeFromWatchlist(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.watchlists.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addToWatchlist.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getWatchlists.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getWatchlists.fulfilled, (state, action) => {
        state.watchlists = action.payload;
        state.isLoading = false;
      })
      .addCase(getWatchlists.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeFromWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.watchlists = state.watchlists.filter(
          (watchlist) => watchlist._id !== action.payload.id
        );
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default watchlistSlice.reducer;
