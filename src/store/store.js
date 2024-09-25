import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/products-slice/AdminProductSlice";
import shopProductsSlice from "./shop/products-slice/ShoppingProductSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    AdminProducts: AdminProductSlice,
    shopProducts: shopProductsSlice,
  },
});

export default store;
