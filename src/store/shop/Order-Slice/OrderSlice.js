import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//1st
const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
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

export const capturePayment = createAsyncThunk(
  "order/createNewOrder",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/capture",
      {
        paymentId,
        payerId,
        orderId,
      }
    );
    return response;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId) => {
    console.log("user id form slice", userId)
    const response = await axios.get(
      `http://localhost:5000/api/shop/order/list/${userId}`
    );
    return response;
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/order/details/${id}`
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
        state.approvalURL = action.payload.data.approvalURL;
        state.orderId = action.payload.data.orderId;
        sessionStorage.setItem(
          "CurrentOrderId",
          JSON.stringify(action.payload.data.orderId)
        );
        console.log("rrr", action.payload);
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
