import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import ventasReducer from './slices/ventasSlice';
import expensesReducer from './slices/expensesSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    ventas: ventasReducer,
    expenses: expensesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;