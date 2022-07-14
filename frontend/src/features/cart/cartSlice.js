import { createSlice } from '@reduxjs/toolkit';

// Read stored Shopping cart items from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: {
      reducer(state, action) {
        const { itemToAdd } = action.payload;
        // Check if the item is already in the cart
        let existingProductIndex;
        const existingProduct = state.cartItems.find((item, index) => {
          if (item.product === itemToAdd.product) {
            existingProductIndex = index;
            return true;
          } else {
            return false;
          }
        });
        if (existingProduct) {
          state.cartItems[existingProductIndex].qty += itemToAdd.qty;
        } else {
          state.cartItems.push(itemToAdd);
        }
        // Store Shopping cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
      prepare(product, qty) {
        return {
          payload: {
            itemToAdd: {
              product: product._id,
              name: product.name,
              image: product.image,
              price: parseFloat(product.price),
              countInStock: product.countInStock,
              qty: parseInt(qty),
            },
          },
        };
      },
    },
  },
});

export default cartSlice.reducer;

export const { addItemToCart } = cartSlice.actions;
