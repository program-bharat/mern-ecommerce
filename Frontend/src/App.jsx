import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import WishList from "./pages/WishList";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage"

// Seller Pages
import SellerDashboard from "./pages/seller/SellerDashboard";
import AddProduct from "./pages/seller/AddProduct";
import ViewProducts from "./pages/seller/ViewProducts"

// Profile pages
import BuyerEditProfile from "./pages/BuyerEditProfile";
import SellerEditProfile from "./pages/seller/SellerEditProfile";

// Protected Routes
import ProtectedRoute from "./components/ProtectedRoute";
// Redirect page according to the role
import RoleRedirect from "./components/RoleRedirect";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <NavBar />
        <Main>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <RoleRedirect>
                  <Home />
                </RoleRedirect>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            {/* Buyer Routes */}
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute allowedRole="buyer">
                  <WishList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute allowedRole="buyer">
                  <BuyerEditProfile />
                </ProtectedRoute>
              }
            />
            {/* Seller Routes */}
            <Route
              path="/seller/dashboard"
              element={
                <ProtectedRoute allowedRole="seller">
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seller/addproducts"
              element={
                <ProtectedRoute allowedRole="seller">
                  <AddProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seller/products"
              element={
                <ProtectedRoute allowedRole="seller">
                  <ViewProducts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seller/profile"
              element={
                <ProtectedRoute allowedRole="seller">
                  <SellerEditProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Main>
        <Footer />
      </Container>
    </BrowserRouter>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  margin-top: 70px;
`;
