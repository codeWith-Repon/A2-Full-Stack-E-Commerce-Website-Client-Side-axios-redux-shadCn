import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/products-slice/AdminProductSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    AdminProducts: AdminProductSlice,
  },
});

export default store;
