import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('/api/products');
    return response.data;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.concat(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice;
