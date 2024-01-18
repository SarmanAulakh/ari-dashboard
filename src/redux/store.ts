import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from './slice/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;