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
      <div className="text-center px-4 md:px-0">
        <div className="flex flex-col gap-6 my-10 max-w-[90%] md:max-w-[70%] mx-auto">
          {/* Animated Heading */}
          <motion.h1
            initial={{ y: 0 }}
            animate={{ y: [0, 20, 20, 0] }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: 0,
            }}
            className="text-3xl md:text-5xl font-bold mt-10 leading-tight"
          >
            Your Dream Job Awaits! <br />
            <span className="text-green-500">
              Search. Apply. Get hired—fast & easy!
            </span>
          </motion.h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-gray-700 mx-auto">
            Discover thousands of job opportunities that match your skills. Take
            the next step in your career with ease!
          </p>

          {/* Search Box */}
          <div className="flex w-full md:w-[60%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full bg-transparent text-black text-sm md:text-base px-2"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-r-full bg-[#38c26b] p-2 md:p-3"
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
