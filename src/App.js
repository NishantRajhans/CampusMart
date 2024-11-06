import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/LogIn";
import Signup from "./Pages/SignUp";
import AllProduct from "./Pages/AllProduct";
import CreateProduct from "./Pages/CreateProduct";
import Product from "./Pages/Product";
import WishList from "./Pages/WishList";
import MyProduct from "./Pages/MyProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/LogIn" element={<Login />} />
      <Route path="/SignUp" element={<Signup />} />
      <Route path="/AllProducts" element={<AllProduct/>} />
      <Route path="/CreateProduct" element={<CreateProduct />} />
      <Route path="/Product/:id" element={<Product/>} />
      <Route path="/WishList" element={<WishList />} />
      <Route path="/MyProducts" element={<MyProduct />} />
    </Routes>
  );
}

export default App;
