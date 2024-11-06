import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../Component/NavBar";
import { useToast } from "../hooks/use-toast"
import { Button } from "../components/ui/button";
const Product = () => {
  const [Product, setProduct] = useState();
  const location = useLocation();
  const navigate=useNavigate()
  const { toast } = useToast()
  const Id = location.pathname.split("/")[2];
  const ProductDetail = async () => {
    const product = await axios.get(
      `http://localhost:4000/api/v1/Product/GetProduct/${Id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setProduct(product.data.Product);
  };
  const handleClick = async () => {
    const Id = location.pathname.split("/")[2];
    const product = await axios.put(
      `http://localhost:4000/api/v1/User/AddToWishList`,
      {
        ProductId: Id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    toast({
      title: "WishList Response...!",
      description: `${product.data.message}`,
    })
  };
  useEffect(() => {
    if (localStorage.getItem("Token") === null) navigate("/LogIn");
    ProductDetail();
  }, []);

  return (
    <div className="bg-black w-full h-full min-h-screen">
      <div className="sticky top-0 z-50 bg-black bg-opacity-70">
        <NavBar />
      </div>
      <div className="border border-slate-700 w-[85%] mx-auto flex justify-between p-5 rounded-md">
        <div className="rounded-md bg-white w-[47%] items-stretch h-[450px] overflow-hidden">
          <img
            src={Product?.ProductImage}
            alt=""
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <div className="w-[47%] p-5 space-y-3 flex-col justify-center items-center">
          <h1 className="text-white text-3xl font-bold text-center">
            {Product?.ProductTitle}
          </h1>
          <p className="text-slate-300 text-xl text-center">
            {Product?.ProductDescription}
          </p>
          <div className="flex justify-evenly text-white">
            <div className="flex gap-2 w-[47%] justify-center items-center">
              <p className="font-bold text-xl">Price: </p>
              <p className="font-bold text-xl">{Product?.ProductPrice}</p>
            </div>
            <div className="flex gap-2 w-[47%] justify-center items-center">
              <p className="font-bold text-xl">Category: </p>
              <p className="font-bold text-xl">{Product?.ProductCategory}</p>
            </div>
          </div>
          <div>
            <p className=" text-2xl font-bold text-center text-white">
              Seller Details
            </p>
            <div className="flex justify-evenly text-white text-lg">
              <div className="flex gap-2">
                <p className="font-bold">First Name: </p>
                <p>{Product?.ProductSeller?.FirstName}</p>
              </div>
              <div className="flex gap-2 text-white">
                <p className="font-bold">Last Name: </p>
                <p>{Product?.ProductSeller?.LastName}</p>
              </div>
            </div>
            <div className="flex gap-2 text-white justify-center items-center text-lg">
              <p className="font-bold">Phone Number: </p>
              <p>{Product?.ProductSeller?.PhoneNumber}</p>
            </div>
            <div className="flex gap-2 text-white justify-center items-center text-lg">
              <p className="font-bold">Email: </p>
              <p>{Product?.ProductSeller?.Email}</p>
            </div>
          </div>
          <Button className="w-full" onClick={() => handleClick()}>
            Add To WishList
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
