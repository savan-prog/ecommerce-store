import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import EditProduct from "./admin/EditProduct";
import ManageUsers from "./admin/ManageUsers";
import ManageOrders from "./admin/ManageOrders";
import AdminProtectRoute from "./admin/AdminProtectRoute";

function App() {
  return (
    <Routes>
      {/* User Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products/:id" element={<ProductDetails />} />
        {/* 404 page not found route */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Layout */}
      <Route
        path="/admin"
        element={
          <AdminProtectRoute>
            <AdminLayout />
          </AdminProtectRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="manage-products" element={<ManageProducts />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="orders" element={<ManageOrders />} />
      </Route>
    </Routes>
  );
}

export default App;
