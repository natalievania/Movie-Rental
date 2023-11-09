import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./movie/Home";
import Detail from "./movie/Detail";
import Header from "./movie/Header";
export const CartContext = React.createContext(null);

function App() {
  const [cart, setCart] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    if (openModal) {
      document.body.style.overflow = "unset";
    } else {
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    }
    setOpenModal(!openModal);
  };
  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cart: cart, setCart: setCart }}>
        <Header setOpenModal={handleOpenModal} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <Home openModal={openModal} setOpenModal={handleOpenModal} />
            }
          />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
