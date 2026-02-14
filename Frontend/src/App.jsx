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
