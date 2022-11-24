import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bannerImg from "../assets/image/banner.png";
import { urlProvider } from '../contexts/UrlContext'

const Home = () => {
  const { baseUrl } = useContext(urlProvider)
  const [categories, setCategories] = useState([]);
  console.log(categories);
  useEffect(()=>{
    axios.get(`${baseUrl}/categories`)
    .then(res => setCategories(res.data))
  },[])

  return (
    <div className="Container">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={bannerImg}
            className="w-full"
            alt="banner"
          />
          <div>
            <h1 className="text-5xl font-bold">Online Shopping</h1>
            <p className="py-6">
            Find your favorite product. We sell very good quality used products
            here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur distinctio nisi nesciunt doloremque, consectetur ex similique aspernatur fugiat. Perferendis adipisci nostrum distinctio consequatur quas debitis repellat numquam cupiditate aliquam libero.
            </p>
            <Link to='/categories' className="btn">See Products</Link>
          </div>
        </div>
      </div>
      <div className="categories">
        <div className="mb-10">
        <h1 className="text-center text-3xl font-bold">Find Your Products</h1>
        <p className="text-center text-orange-500 text-xl">Categories</p>
        </div>
        <div className="flex flex-wrap justify-center">
          {
            categories.map(category => <div key={category._id} 
            className="w-[100px]  flex items-center mr-10 justify-start">
              <Link to={`/categories/${category.name}`} className="w-full">
                <img src={category.logo} alt="logo" className="w-full" />
              </Link>
            </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
