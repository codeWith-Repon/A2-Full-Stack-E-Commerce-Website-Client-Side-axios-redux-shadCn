import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/products-slice/AdminProductSlice";
import shopProductsSlice from "./shop/products-slice/ShoppingProductSlice";
import shopCartSlice from "./shop/Cart-Slice/ShopCartSlice";
import shopAddressSlice from "./shop/address-slice/AddressSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    AdminProducts: AdminProductSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
  },
});

export default store;
