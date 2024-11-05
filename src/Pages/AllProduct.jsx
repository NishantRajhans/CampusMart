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
const AllProduct = () => {
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();
  const ProductData = async () => {
    const Productdata = await axios.get(
      "http://localhost:4000/api/v1/Product/GetAllProducts",
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setProduct(Productdata.data.Products);
  };
  useEffect(() => {
    if (localStorage.getItem("Token") === null) navigate("/LogIn");
    ProductData();
  }, []);
  return (
    <div className="bg-black w-full h-full min-h-screen">
      <div className="sticky top-0 z-50 bg-black bg-opacity-70">
        <NavBar />
      </div>
      <div className="flex gap-11 mt-10 items-center justify-center">
        <Button>AllProducts</Button>
        <Button>Calculator</Button>
        <Button>Uniform</Button>
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
