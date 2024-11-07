import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import NavBar from "../Component/NavBar";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Other"); // Default value
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const submitHandler = async (data) => {
    if (!localStorage.getItem("Token")) {
      navigate("/LogIn");
    } else {
      try {
        const formData = new FormData();
        formData.append("ProductDescription", data.DESCRIPTION);
        formData.append("ProductPrice", data.PRICE);
        formData.append("ProductCategory", selectedCategory);
        formData.append("ProductTitle", data.TITLE);
        formData.append("ProductImage", file);

        const response = await axios.post(
          "http://localhost:4000/api/v1/Product/CreateProduct",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        if(response.data.message=="Product Create Successfully"){
          toast.success(response.data.message)
          reset();
        }else{
          toast.error(response.data.message)
        }
      } catch (err) {
        toast.error("Error in Creating Product");
      }
    }
  };
  useEffect(()=>{
    if (localStorage.getItem("Token") === null) navigate("/LogIn");
  },[])
  return (
    <div className="bg-black h-screen">
      <div className="sticky top-0 z-50 bg-black bg-opacity-70">
        <NavBar />
      </div>
      <Card className="w-[70%] bg-black border border-slate-800 mx-auto">
        <CardHeader>
          <CardTitle className="mx-auto font-bold text-white text-3xl">
            Create Product
          </CardTitle>
          <CardDescription className="mx-auto text-center text-2xl text-slate-400">
            Create a new product listing by providing details such as name,
            description, price, and category. Easily manage and showcase your
            items to potential buyers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="w-full flex-col space-y-7">
              <div className="flex flex-col">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Type Description Of Your Product..."
                  {...register("DESCRIPTION", { required: true })}
                  className="text-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="w-[47%]">
                  <Label htmlFor="title" className="text-white">
                    Product Title
                  </Label>
                  <Input
                    id="tile"
                    type="text"
                    placeholder="Enter Product Title"
                    {...register("TITLE", { required: true })}
                    className="text-white"
                  />
                </div>
                <div className="w-[47%]">
                  <Label htmlFor="price" className="text-white">
                    Product Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter Product Price $"
                    {...register("PRICE", { required: true })}
                    className="text-white"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-[47%]">
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <Select
                    onValueChange={setSelectedCategory}
                    value={selectedCategory}
                  >
                    <SelectTrigger className="text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Uniform">Uniform</SelectItem>
                      <SelectItem value="Calculator">Calculator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-[47%]">
                  <Label htmlFor="fileUpload" className="text-white">
                    Product Image
                  </Label>
                  <Input
                    id="fileUpload"
                    type="file"
                    onChange={handleFileUpload}
                    className="text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="mt-5"
                  type="submit"
                >
                  Create Product
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProduct;
