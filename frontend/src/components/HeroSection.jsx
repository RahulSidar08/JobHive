import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import left from "../assets/left1.webp";
import right from "../assets/right.webp";
import { motion } from "motion/react";
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <>
      <div className="text-center">
        {/* <div className="absolute top-[300px] left-[10px] ">
          <img src={left} alt="" height="20px" width="300px" />
        </div> */}
        <div className="flex flex-col gap-8 my-10">
          <motion.h1
            initial={{ y: 0 }}
            animate={{ y: [0, 20, 20, 0] }} // Subtle bounce
            transition={{
              duration: 1.5, // Slow and smooth
              ease: "easeInOut", // Smooth acceleration and deceleration
              repeat: 0, // No repetition
            }}
            className="text-5xl font-bold mt-10"
          >
            Your Dream Job Awaits! <br />
            <span className="text-green-500">
              Search. Apply. Get hired—fast & easy!
            </span>
          </motion.h1>
          <div className="ml-20">
            <p className="text-2xl">
              Discover thousands of job opportunities that match your skills.
              Take the next step in your career with ease!
            </p>
          </div>
          <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full bg-transparent text-black"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-r-full bg-[#38c26b]"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
