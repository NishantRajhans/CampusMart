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
import { useToast } from "../hooks/use-toast";

const MyProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [Product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [productId,setProductId]=useState(null);
  const navigate=useNavigate()
  const { toast } = useToast();

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
    const response = await axios.delete(
      `http://localhost:4000/api/v1/Product/DeletProduct/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    toast({
      title: "Product Response...!",
      description: `${response.data.message}`,
    });
    ProductCall();
  };

  const submitHandler = async (data) => {
    try {
      const response=await axios.put(`http://localhost:4000/api/v1/Product/EditProduct/${productId}`,{
        ProductDescription:data.description,
        ProductPrice:data.price,
        ProductTitle:data.title,
        ProductImage:data.image[0],
      },{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      console.log(response)
      reset();
      ProductCall();
      setOpen(false);
    } catch (err) {
      console.error("Error SignUp:", err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("Token") === null) navigate("/LogIn");
    ProductCall();
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
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-200">
                      This action cannot be undone. This will permanently delete
                      this product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-black">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleclick(product._id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Dialog >
                <DialogTrigger asChild>
                  <Button onClick={()=>setOpen(true)}>
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-black text-white border-slate-700">
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription className="text-slate-300">
                      Click save when you've finished making changes to the
                      product.
                    </DialogDescription>
                  </DialogHeader>
                  <form 
                    onSubmit={handleSubmit(submitHandler)}
                    className="flex-col justify-center items-center"
                  >
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="title"
                          {...register("title", { required: true })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="description"
                          {...register("description", { required: true })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Price
                        </Label>
                        <Input
                          id="price"
                          {...register("price", { required: true })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="image"
                          className="text-right text-white"
                        >
                          Image
                        </Label>
                        <Input
                          id="image"
                          {...register("image")}
                          className="col-span-3 text-white"
                          type="file"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" onClick={()=>setProductId(product._id)}>Save changes</Button>
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
