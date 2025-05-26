import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import ventasReducer from './slices/ventasSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    ventas: ventasReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;