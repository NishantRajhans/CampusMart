import React from "react";
import NavBar from "../Component/NavBar";
import { Button } from "../components/ui/button";
import {
  CloudDrizzleIcon,
  FacebookIcon,
  LockIcon,
  MailIcon,
  ServerIcon,
} from "lucide-react";
import { Label } from "../components/ui/label";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import {
    GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
const features = [
  {
    name: "Save Money: ",
    description:
      " Buy quality used items at a fraction of the cost of new ones, helping you stretch your college budget further.",
    icon: CloudDrizzleIcon,
  },
  {
    name: "Sustainability: ",
    description:
      "Reduce waste and environmental impact by giving pre-loved items a second life.",
    icon: LockIcon,
  },
  {
    name: "Community: ",
    description:
      "Join a vibrant community of college students buying and selling goods, supporting each other along the way.",
    icon: ServerIcon,
  },
];
const footerLogo = [
  {
    id: 1,
    logo: InstagramLogoIcon,
  },
  {
    id: 2,
    logo: FacebookIcon,
  },
  {
    id: 3,
    logo: TwitterLogoIcon,
  },
  {
    id: 4,
    logo: LinkedInLogoIcon,
  },
  {
    id: 5,
    logo: GitHubLogoIcon,
  },
  {
    id: 6,
    logo: MailIcon,
  },
];
const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submitHandler = async () => {};
  return (
    <div className="bg-black w-full h-full min-h-screen">
        <div className="sticky top-0 z-50 bg-black bg-opacity-70">
        <NavBar />
      </div>
      <div>
        <div className="">
          <div className="w-[60%] rounded-md border border-slate-700 flex flex-col justify-center items-center gap-20 mx-auto p-5 gap-y-20">
            <h1 className="text-white text-5xl text-center font-bold">
              Welcome to CampusMart - Your Campus Marketplace!
            </h1>
            <p className=" text-slate-300 text-xl text-center">
              Are you a college student looking to save money on essential items
              for your academic journey? Look no further! CampusMart is your go-to
              destination for finding affordable, high-quality used products
              tailored to your college needs.
            </p>
            <Button className="w-40">Learn</Button>
          </div>
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
      <div className="mt-9 flex justify-between p-2 items-center">
        <div className="w-[48%] flex-col p-14 border rounded-md mb-6 border-slate-700">
          <h1 className="text-4xl font-bold text-center text-white">
            Discover Affordable College Essentials
          </h1>
          <p className="mt-6 text-lg leading-8 text-warning-100 text-center text-slate-300">
            Browse through our diverse selection of college essentials,
            including textbooks, electronics, furniture,and clothing. Whether
            you're gearing up for a new semester or looking to upgrade your
            study space, we've got you covered with budget-friendly options that
            won't break the bank.
          </p>
          <div>
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9 mt-5">
                <dt className="inline font-semibold text-white">
                  <feature.icon
                    className="absolute left-1 top-1 h-5 w-5 text-warning-100"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>{" "}
                <dd className="inline text-warning-100 text-slate-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-col w-[48%] p-14 border rounded-md mt-10 border-slate-700 h-[80%]">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join the CampusMart Community Today!
          </h2>
          <p className="mt-4 text-lg leading-8 text-warning-100 text-slate-400">
            Ready to start saving money and finding great deals on college
            essentials? Sign up now to unlock exclusive benefits, connect with
            fellow students, and take advantage of our student-friendly
            marketplace!
          </p>
          <div className="flex gap-6 mt-2">
            <Input
              id="email"
              placeholder="Enter Your Email"
              {...register("EMAIL", { required: true })}
              className="w-[70%] text-slate-400"
            />
            <Button onClick={handleSubmit(submitHandler)} className="w-[20%]">
              LogIn
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4 text-center text-warning-100 text-white mt-10">
      <div className="flex justify-center space-x-16">
        {footerLogo.map((logo) => {
          const LogoComponent = logo.logo;
          return <LogoComponent key={logo.id} className="w-6 h-6" />;
        })}
      </div>
      <p className="mt-10">
        © 2024 Copyright:{" "}
        <Link href="" className="text-warning-100">
          CampusMart
        </Link>
      </p>
    </div>
    </div>
  );
};

export default Home;
