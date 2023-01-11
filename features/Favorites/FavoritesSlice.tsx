import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product/Product";
import { toast, Zoom } from "react-toastify";

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

        // Toast Success Message
        toast.success(`${action.payload.title} added to Favorites`, {
          position: "top-center",
          autoClose: 2500,
          transition: Zoom,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    },

    //Removing from Favorites
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);

      // Toast Removed Item From Favorites Message
      toast.error("Item removed from Favorites", {
        position: "top-center",
        autoClose: 2500,
        transition: Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
