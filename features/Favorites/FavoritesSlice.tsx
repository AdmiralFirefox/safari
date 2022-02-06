import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product/Product";

const initialState: Product[] = [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    //Adding To Favorites
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.added === true;
      } else {
        state.push({ ...action.payload, added: false });
      }
    },

    //Removing from Favorites
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
