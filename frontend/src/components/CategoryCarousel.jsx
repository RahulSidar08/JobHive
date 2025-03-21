import React from "react";
// import { Card, CardContent } from "./ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Data Science",
  "Data Science",
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
      <Carousel className="w-full max-w-xl">
      <CarouselContent className="-ml-1">
      {category.map((cat, index) => (
            <CarouselItem key={index} className="basis-auto">
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline-none"
                className="rounded-full bg-green-400 hover:bg-green-500 px-6 py-2 text-sm sm:text-base text-black"
              >
                {cat}
              </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  );
};

export default CategoryCarousel;
