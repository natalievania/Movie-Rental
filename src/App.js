import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./movie/Home";
import Detail from "./movie/Detail";
import Header from "./movie/Header";
export const CartContext = React.createContext(null);

function App() {
  const [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cart: cart, setCart: setCart }}>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
