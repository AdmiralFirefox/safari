import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product/Product";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //Add Items to Cart
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        //Setting the Limit to 50
        if (itemExists.quantity! >= 50) {
          itemExists.quantity = 50;
        } else {
          itemExists.quantity!++;
        }
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    //Updating the Quantity of the Product
    setQuantity: (state, action: PayloadAction<Product>) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity! = action.payload.quantity!;
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity });
      }
    },

    //Custom Quantity to add on the Cart
    addProductQuantity: (state, action: PayloadAction<Product>) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        //Setting the Limit to 50
        const limit = itemExists.quantity! + action.payload.quantity!;

        if (itemExists.quantity! >= 50) {
          itemExists.quantity = 50;
        } else if (limit >= 50) {
          itemExists.quantity = 50;
        } else {
          itemExists.quantity! += action.payload.quantity!;
        }
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity });
      }
    },

    //Incrementing Quantity from Cart
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.find((item) => item.id === action.payload);
      item!.quantity!++;

      //Setting the Limit to 50
      if (item!.quantity! >= 50) {
        item!.quantity = 50;
      }
    },

    //Decrement Quantity from Cart
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item!.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload);
        state.splice(index, 1);
      } else {
        item!.quantity!--;
      }
    },

    //Clear all items in the cart
    clearCart: () => {
      return initialState;
    },

    //Removing the item entirely from the Cart
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const {
  addItemToCart,
  setQuantity,
  addProductQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  removeItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
