import * as React from "react";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Signup() {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm();
      const navigate=useNavigate();
  const submitHandler = async (data) => {
    try {
      const response = await axios.post(
        "https://campusmart-backend.onrender.com/api/v1/Auth/SignUp",
        {
          FirstName: data.FIRSTNAME,
          LastName: data.LASTNAME,
          Email: data.EMAIL,
          Password: data.PASSWORD,
          ConfirmPassword: data.CONFIRMPASSWORD,
          PhoneNumber: data.PHONENUMBER,
        },
        {
          headers:{
            'Content-Type':'application/json'
          }
        }
      );
      if (response.data.message !== "User already exists") navigate("/LogIn");
      if(response.data.message=="Email send Successfully"){
        toast.success("Email send Successfully..!!")
        navigate("/LogIn")
        reset();
      }
      else{
        toast.error(response.data.message)
        reset();
      }
    } catch (err) {
      toast.error("Error In SignUp");
    }
  };
  return (
    <div className="flex items-center justify-center bg-black h-screen">
      <Card className="w-[350px] shadow-lg bg-neutral-900 border border-slate-700">
        <CardHeader>
          <CardTitle className="mx-auto font-bold text-white">SignUp Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstname" className="text-white">First Name</Label>
                <Input id="firstname" placeholder="Enter Your First Name" className="text-white"  {...register("FIRSTNAME", { required: true })}/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastname" className="text-white">Last Name</Label>
                <Input id="lastname" placeholder="Enter Your Last Name" className="text-white" {...register("LASTNAME", { required: true })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input id="email" placeholder="Enter Your Email" className="text-white" {...register("EMAIL", { required: true })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input id="password" placeholder="Enter Your Password" className="text-white" {...register("PASSWORD", { required: true })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmpassword" className="text-white">Confirm Password</Label>
                <Input id="confirmpassword" placeholder="Enter Confirm Password" className="text-white" {...register("CONFIRMPASSWORD", { required: true })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phonenumber" className="text-white">PhoneNumber</Label>
                <Input id="phonenumber" placeholder="Enter PhoneNumber" type="number" className="text-white" {...register("PHONENUMBER", { required: true })}/>
              </div>
            </div>
            <Button className="w-full mt-4 font-bold hover:text-white" type="submit">
            SignUp
          </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
