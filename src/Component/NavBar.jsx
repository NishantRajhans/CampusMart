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
    id: 1,
    name: "Home",
    path: "/Home",
  },
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
    
  }
  return (
    <div className=" w-full bg-black bg-opacity-50 rounded-md shadow-md text-white flex p-5 justify-between">
      <div className="flex justify-center items-center">
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
            <HoverCardContent className="w-32 flex-col justify-center items-center ">
              <div className="w-full cursor-pointer hover:bg-black hover:text-white rounded-sm">
                <p className=" text-center" onClick={()=>handleLogOut()}>LogOut</p>
              </div>
              <div className="w-full cursor-pointer hover:bg-black hover:text-white rounded-sm">
                <p className=" text-center">Profile</p>
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
