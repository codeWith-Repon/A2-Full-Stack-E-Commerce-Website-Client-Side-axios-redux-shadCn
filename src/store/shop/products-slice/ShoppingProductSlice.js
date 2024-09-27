import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//2nd
const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

//3rd
export const fetchAllFilterdProducts = createAsyncThunk(
  "/products/fetchAllFilterdProducts",
  async ({ filterParams, sortParams }) => {
    console.log("fetchAllFilterdProducts", fetchAllFilterdProducts);
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );
    return result?.data;
  }
);

export const fetchProdcutDetails = createAsyncThunk(
  "/products/fetchProdcutDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );
    return result?.data;
  }
);

//1st
const shoppingProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //4th
    builder
      .addCase(fetchAllFilterdProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilterdProducts.fulfilled, (state, action) => {
        console.log("recived product", action.payload);

        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilterdProducts.rejected, (state, action) => {
        (state.isLoading = false), (state.productList = []);
      })
      .addCase(fetchProdcutDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProdcutDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProdcutDetails.rejected, (state, action) => {
        state.isLoading = false; 
        state.productDetails = null;
      });
  },
});

export default shoppingProductsSlice.reducer;
