import React, { useState } from "react";
import NavBar from "../Component/NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "react-toastify";
const AllProduct = () => {
  const [Product, setProduct] = useState([]);
  const [currButton, setCurrButton] = useState("AllProducts");
  const navigate = useNavigate();
  const ProductData = async (value) => {
    try {
      if (value == "AllProducts") {
        const response = await axios.get(
          "http://localhost:4000/api/v1/Product/GetAllProducts",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        if(response.data.message=="Get All Products Successfully"){
          toast.success(response.data.message)
          setProduct(response.data.Products);
        }else{
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.get(
          `http://localhost:4000/api/v1/Product/GetProductsByCategory/${value}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        if(response.data.message=="Get Products Successfully"){
          toast.success(`Get ${value} Successfully`)
          setProduct(response.data.Product);
        }else{
          toast.error(response.data.message)
        }
      }
    } catch (err) {
      console.error("error in Allproducts"+err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("Token") === null) navigate("/LogIn");
    ProductData(currButton);
  }, [currButton]);
  return (
    <div className="bg-black w-full h-full min-h-screen">
      <div className="sticky top-0 z-50 bg-black bg-opacity-70">
        <NavBar />
      </div>
      <div className="flex gap-11 mt-10 items-center justify-center">
        <Button
          className={`${currButton === "AllProducts" ? "text-white" : "text-black"}`}
          onClick={() => setCurrButton("AllProducts")}        
        >
          AllProducts
        </Button>
        <Button
          className={`${currButton === "Calculator" ? "text-white" : "text-black"}`}
          onClick={() => setCurrButton("Calculator")}
        >
          Calculator
        </Button>
        <Button
          className={`${currButton === "Uniform" ? "text-white" : "text-black"}`}
          onClick={() => setCurrButton("Uniform")}
        >
          Uniform
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mx-auto">
        {Product?.map((product) => (
          <Card
            key={product._id}
            className="w-[350px] p-2 bg-black border-slate-700 rounded-md flex-col justify-center items-center"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-white">
                {product.ProductTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <img
                src={product.ProductImage}
                className="w-full h-32 bg-white rounded-md"
              ></img>
              <CardDescription className="text-slate-300">
                {product.ProductDescription.substring(0, 50) + "......"}
              </CardDescription>
              <div className=" font-bold text-white">
                {product.ProductPrice + "$"}
              </div>
              <div className="flex justify-center">
                <Button
                  className=" mt-1 w-[70%]"
                  onClick={() => {
                    navigate(`/Product/${product._id}`);
                  }}
                >
                  View Product
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
