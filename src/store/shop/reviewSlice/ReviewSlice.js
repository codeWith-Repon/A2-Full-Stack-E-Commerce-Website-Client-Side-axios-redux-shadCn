import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initalState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk("order/addReview", async (data) => {
  const response = await axios.post(
    `http://localhost:5000/api/shop/review/add`,
    { data }
  );
  return response.data;
});

export const getReviews = createAsyncThunk("order/getReviews", async (id) => {
  const response = await axios.get(
    `http://localhost:5000/api/shop/search/${id}`
  );
  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.pending, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
