import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from 'src/utils/apiClient';
// import { token } from 'src/utils/token';

export interface GameState {
  data: any;
  status: 'idle' | 'succeeded' | 'loading' | 'failed';
  error: any;
}

const initialState: GameState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchGameListAsync = createAsyncThunk('game/fetchGameList', async (token: any) => {
  const response = await apiClient.get('/game', {
    headers: {
      Authorization: `Bearer ${await token()}`,
    },
  });
  return response.data;
});

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGameListAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchGameListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default gameSlice.reducer;

export const selectAllGames = (state: any) => state.game.data;

export const selectGameById = (state: any, gameId: string) => state.game.data.find((game: any) => game.gameId === gameId);
