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

// Seller Pages
import SellerDashboard from "./pages/seller/SellerDashboard";
import AddProduct from "./pages/seller/AddProduct";
import ViewProducts from "./pages/seller/ViewProducts"

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <NavBar />

        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/category/:title" element={<CategoryPage />} />

            {/* Seller Routes */}
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/addproducts" element={<AddProduct />} />
            <Route path="/seller/products" element={<ViewProducts />} />
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
