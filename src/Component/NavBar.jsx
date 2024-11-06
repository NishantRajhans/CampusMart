import React from "react";
import { Button } from "../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { Recycle } from "lucide-react";
const menuList = [
  {
    id: 2,
    name: "AllProducts",
    path: "/AllProducts",
  },
  {
    id: 3,
    name: "CreateProduct",
    path: "/CreateProduct",
  },
  {
    id: 4,
    name: "WishList",
    path: "/WishList",
  },
  {
    id: 5,
    name: "MyProducts",
    path: "/MyProducts",
  },
];
const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const Page = location.pathname.split("/")[1];
  const handleLogOut=async()=>{
    localStorage.removeItem("UserId");
      localStorage.removeItem("FirstName");
      localStorage.removeItem("LastName");
      localStorage.removeItem("UserEmail");
      localStorage.removeItem("Token");
      navigate("/LogIn");
  }
  return (
    <div className=" w-full bg-black bg-opacity-50 rounded-md shadow-md text-white flex p-5 justify-between">
      <div className="flex justify-center items-center cursor-pointer" onClick={()=>navigate("/")}>
      <Recycle className=" w-11 h-11" />
      <h1 className="text-2xl font-bold">CampusMart</h1>
      </div>
      <div>
        {menuList.map((list) => {
          return (
            <Link
              to={list.path}
              key={list.id}
              className={`flex-col m-6 hover:text-slate-400 transition-all duration-150 ${
                Page === list.name ? "text-slate-400" : "text-white"
              }`}
            >
              {list.name}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4">
        {localStorage.getItem("Token") ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="cursor-pointer"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-32 flex-col justify-center items-center bg-black border-slate-800 ">
              <div className="w-full cursor-pointer text-white rounded-sm hover:bg-white hover:text-slate-800">
                <p className=" text-center font-bold" onClick={()=>handleLogOut()}>LogOut</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <>
            <Button onClick={() => navigate("/SignUp")}>SignUp</Button>
            <Button onClick={() => navigate("/LogIn")}>LogIn</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
