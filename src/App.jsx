import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/Admin-View/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminProducts from "./pages/admin-view/AdminProducts";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import ShopingLayout from "./components/Shopping-Vew/ShopingLayout";
import NotFound from "./pages/not-found/NotFound";
import ShoppingHome from "./pages/Shopping-view/ShoppingHome";
import ShopingCheckOut from "./pages/Shopping-view/ShopingCheckOut";
import ShopingListing from "./pages/Shopping-view/ShopingListing";
import ShopingAccount from "./pages/Shopping-view/ShopingAccount";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">

      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin/>}/>
          <Route path="register" element={<AuthRegister/>}/>        
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="products" element={<AdminProducts/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="features" element={<AdminFeatures/>}/>
        </Route>
        <Route path="/shop" element={<ShopingLayout/>}>
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="listing" element={<ShopingListing/>}/>
          <Route path="checkout" element={<ShopingCheckOut/>}/>
          <Route path="account" element={<ShopingAccount/>}/>
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
