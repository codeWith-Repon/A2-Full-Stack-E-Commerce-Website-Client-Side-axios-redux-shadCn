import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//1st
const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

//3rd
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/create",
      orderData
    );
    return response;
  }
);

//2nd
const shoppingOrderSlice = createSlice({
  name: "ShoppingOrderSlice",
  initialState,
  reducers: {},
  //4th
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
