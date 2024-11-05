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

const MyProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [Product, setProduct] = useState([]);
  const [openProductId, setOpenProductId] = useState(null);

  const ProductCall = async () => {
    const ProductData = await axios.get(
      "http://localhost:4000/api/v1/Product/GetMyProducts",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setProduct(ProductData?.data?.Products);
  };

  const handleclick = async (id) => {
    await axios.delete(
      `http://localhost:4000/api/v1/Product/DeletProduct/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    ProductCall();
  };

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append("ProductDescription", data.description);
      formData.append("ProductPrice", data.price);
      formData.append("ProductTitle", data.title);
      formData.append("ProductImage", data.image[0]);
      const response = await axios.put(
        `http://localhost:4000/api/v1/Product/EditProduct/${data.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      ProductCall();
      reset();
    } catch (err) {
      console.error("Error in Fetching data:", err);
    }
  };
  useEffect(() => {
    ProductCall();
    console.log("hii")
  }, []);

  return (
    <div className="bg-black w-full h-full min-h-screen">
      <div className="sticky top-0 z-50 bg-black bg-opacity-70">
        <NavBar />
      </div>
      <div className="space-y-4">
      {Product.map((product) => (
        <div
          key={product._id}
          className="border border-slate-700 w-[80%] flex p-3 space-x-2 rounded-md justify-center items-center mx-auto h-[150px]"
        >
          <div className="w-[15%] h-[120px] overflow-hidden">
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
          <div className="flex justify-center items-center gap-2 w-[12%]">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-black text-white border-slate-700">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-200">
                    This action cannot be undone. This will permanently delete this product.
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

            <Dialog open={openProductId === product._id} onOpenChange={(isOpen) => setOpenProductId(isOpen ? product._id : null)}>
              <DialogTrigger asChild>
                <Button onClick={() => setOpenProductId(product._id)}>Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black text-white border-slate-700">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                  <DialogDescription className="text-slate-300">
                    Click save when you've finished making changes to the product.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit((data) => submitHandler(data, product._id))}
                  className="flex-col justify-center items-center"
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">Title</Label>
                      <Input
                        id="title"
                        {...register("title", { required: true })}
                        defaultValue={product.ProductTitle}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">Description</Label>
                      <Input
                        id="description"
                        {...register("description", { required: true })}
                        defaultValue={product.ProductDescription}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">Price</Label>
                      <Input
                        id="price"
                        {...register("price", { required: true })}
                        defaultValue={product.ProductPrice}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="id" className="text-right">Product Id</Label>
                      <Input
                        id="id"
                        {...register("id", { required: true })}
                        defaultValue={product._id}
                        className="col-span-3"
                        readOnly
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right text-white">Image</Label>
                      <Input
                        id="image"
                        {...register("image")}
                        className="col-span-3 text-white"
                        type="file"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Save changes</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MyProduct;
