import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import employeeReducer from 'features/absence-management/employeeSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
