import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    // Actions
    addToBag: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBag: (state, action) => {
      const index = state.items.findIndex(
        (bagItem) => bagItem._id === action.payload
      );

      let newBag = [...state.items];

      if (index >= 0) {
        // Item found in the bag..remove it
        newBag.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload}) as it is not in the bag`
        );
      }
      state.items = newBag;
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToBag, removeFromBag, emptyCart } = bagSlice.actions;

// Selectors- This is how we pull information from the global store slice
export const selectItems = (state) => state.bag.items;
export const selectTotal = (state) =>
  state.bag.items.reduce((total, item) => total + item.price, 0);

export default bagSlice.reducer;
