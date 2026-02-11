import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <NavBar />

        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
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
`;
