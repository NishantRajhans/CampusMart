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

export default function LogIn() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submitHandler = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/Auth/LogIn`,
        {
          Email: data.EMAIL,
          Password: data.PASSWORD,
          ConfirmPassword: data.CONFIRMPASSWORD,
        }
      );
      console.log(response.data.User);
      localStorage.setItem("UserId", response.data.User._id);
      localStorage.setItem("FirstName", response.data.User.FirstName);
      localStorage.setItem("LastName", response.data.User.LastName);
      localStorage.setItem("UserEmail", response.data.User.Email);
      localStorage.setItem("Token", response.data.User.Token);
      navigate("/Home");
      reset();
    } catch (error) {
      console.error("Error LogIn", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-black h-screen">
      <Card className="w-[350px] bg-neutral-900 border border-slate-700">
        <CardHeader>
          <CardTitle className="mx-auto font-bold text-white">LogIn Form</CardTitle>
          <CardDescription className="mx-auto text-gray-300">
            Access your account by entering your email and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter Your Email"
                  {...register("EMAIL", { required: true })}
                  className="text-white"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter Your Password"
                  {...register("PASSWORD", { required: true })}
                  className="text-white"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Confirmpassword" className="text-white">ConfirmPassword</Label>
                <Input
                  id="Confirmpassword"
                  placeholder="Enter Your ConfirmPassword"
                  {...register("CONFIRMPASSWORD", { required: true })}
                  className="text-white"
                />
              </div>
              <Button
                className="w-full font-bold hover:text-white"
                type="submit"
              >
                LogIn
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
