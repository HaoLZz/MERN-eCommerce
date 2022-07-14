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
        const existingProductIndex = state.cartItems.findIndex(
          (item) => item.product === itemToAdd.product,
        );
        if (existingProductIndex === -1) {
          state.cartItems.push(itemToAdd);
        } else {
          state.cartItems[existingProductIndex].qty += itemToAdd.qty;
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
    updateItemQty(state, action) {
      const { newQty, product } = action.payload;
      // Find the index of product needs to be updated
      const existingProductIndex = state.cartItems.findIndex(
        (item) => item.product === product,
      );

      if (existingProductIndex !== -1) {
        state.cartItems[existingProductIndex].qty = parseInt(newQty);
      } else {
        console.error('Product is no longer in the cart');
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeItemFromCart(state, action) {
      const product = action.payload;
      // Find the index of product needs to be removed
      const existingProductIndex = state.cartItems.findIndex(
        (item) => item.product === product,
      );

      if (existingProductIndex !== -1) {
        state.cartItems.splice(existingProductIndex, 1);
      } else {
        console.error('Product is no longer in the cart');
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export default cartSlice.reducer;

export const { addItemToCart, updateItemQty, removeItemFromCart } =
  cartSlice.actions;
