import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart/CartSlice";

const reducers = combineReducers({
  cart: cartReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
