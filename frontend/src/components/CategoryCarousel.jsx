import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full flex flex-col items-center my-10">
      <Carousel className="w-full max-w-2xl px-4 overflow-hidden">
        <CarouselContent className="flex gap-3 transition-transform duration-500 ease-in-out">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="shrink-0 w-full sm:w-auto">
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full bg-green-400 hover:bg-green-500 px-6 py-2 text-sm sm:text-base text-black"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-between w-full px-4 mt-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
