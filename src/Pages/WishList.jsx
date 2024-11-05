import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../Component/NavBar";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useForm } from "react-hook-form";

const WishList = () => {
  const [WishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const WishListCall = async () => {
    const WishListData = await axios.get(
      "http://localhost:4000/api/v1/User/GetAllWishListProducts",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setWishList(WishListData?.data?.User[0]?.WishList);
  };
  const handleclick = async (id) => {
    const WishListData = await axios.delete(
      `http://localhost:4000/api/v1/User/RemoveFromWishList/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    WishListCall();
  };
  useEffect(() => {
    WishListCall();
  }, []);
  return (
    <div className="bg-black w-full h-full min-h-screen">
      <div className="sticky top-0 z-50 bg-black bg-opacity-70">
        <NavBar />
      </div>
      <div className="space-y-3">
        {WishList.map((product)=>{
          return (
            <div
              key={product._id}
              className="border border-slate-700 w-[80%] flex p-3 space-x-2 rounded-md justify-center items-center mx-auto h-[150px]"
            >
              <div className="w-[15%] h-[120px] flex overflow-hidden">
                <img
                  src={product.ProductImage}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="w-[70%]">
                <p className="text-white font-bold text-lg">
                  {product.ProductTitle}
                </p>
                <p className="text-white">{product.ProductDescription}</p>
                <p className="text-white font-bold">
                  {product.ProductPrice + " $"}
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 w-[10%]">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>Remove</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-black text-white border-slate-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-200">
                        This action cannot be undone. This will permanently remove this product from your Wishlist.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleclick(product._id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          );          
        })}
      </div>
    </div>
  );
};

export default WishList;