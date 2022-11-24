import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { urlProvider } from "../contexts/UrlContext";
import "./page.css";
import { BsFillCheckCircleFill } from "react-icons/bs";

const CategoryItems = () => {
  const { baseUrl } = useContext(urlProvider);
  const { name } = useParams();
  const { data: categoryItems, isLoading } = useQuery({
    queryKey: ["categoryItems"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/products/${name}`);
      const data = res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="Container">
      <h1 className="text-3xl text-center mb-20">Find your phon: {name}</h1>
      <div className="productsWrapper">
        <div>
          <div className="sticky top-5">
            <h1 className="text-2xl mb-4">Search Phone</h1>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="p-5 mb-20">
          {categoryItems.map((item) => (
            <div className="flex items-center p-5 mb-10">
              <div className="w-[200px] h-full">
                <img src={item.img} alt="phon" className="w-full" />
              </div>
              <div>
                <p className="text-3xl">Name: {item.name}</p>
                <p className="text-xl">Seller Name: {item.sellerName} <BsFillCheckCircleFill className="text-blue-700 w-[15px] h-[15px] m-0 inline"  /></p>
                <p>Location: {item.location}</p>
                <p>
                  Resale Price:{" "}
                  <span className="font-bold">{item.resalePrice}</span>
                </p>
                <p>Original Price: {item.originalPrice}</p>
                <p>Years of use: {item.used}</p>
                <p>Post date: {item.date || 20}</p>
                <button className="btn btn-sm mt-5">Purchase</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryItems;
