import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bannerImg from "../assets/image/banner.png";
import Advertise from "../Components/Advertise";
import { urlProvider } from "../contexts/UrlContext";
import {BsTelephoneForward} from 'react-icons/bs' 
import {AiOutlineMail} from 'react-icons/ai'
import Loader from "../Components/Loader";
import { authProvider } from "../contexts/UserContext";

const Home = () => {
  const { baseUrl } = useContext(urlProvider);
  const [categories, setCategories] = useState([]);
  const {user} = useContext(authProvider)
  const [advertiseProducts, setAdvertiseProducts] = useState([]);
  const [advertiseLength, setAdvertiseLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baseUrl}/categories`).then((res) => setCategories(res.data));
    axios.get(`${baseUrl}/advertiseProducts`,{
      headers:{
        authorization:`bearer ${localStorage.getItem('blackToken')}`
      }
    }).then((res) => {
      setAdvertiseProducts(res.data);
      setAdvertiseLength(res.data.length);
      setIsLoading(false);
    });
  }, [baseUrl]);

  if (isLoading) {
    return <Loader/>
  }

  return (
    <>
      <div className="Container">
        {/* hero */}
        <div className="hero mb-28">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={bannerImg} className="w-[500px]" alt="banner" />
            <div>
              <h1 className="text-5xl font-bold">Online Shopping</h1>
              <p className="py-6">
                Find your favorite product. We sell very good quality used
                products here. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Tenetur distinctio nisi nesciunt doloremque,
                consectetur ex similique aspernatur fugiat. Perferendis adipisci
                nostrum distinctio consequatur quas debitis repellat numquam
                cupiditate aliquam libero.
              </p>
              <Link to="/" className="btn">
                See Products
              </Link>
            </div>
          </div>
        </div>
        {/* //categories */}
        <div className="categories mb-28">
          <div className="mb-10">
            <h1 className="text-center text-3xl font-bold">
              Find Your Products
            </h1>
            <p className="text-center text-orange-500 text-xl">Categories</p>
          </div>
          <div className="flex flex-wrap justify-center">
            {categories.map((category) => (
              <div
                key={category._id}
                className="w-[100px]  flex items-center mr-10 justify-start"
              >
                <Link to={`/categories/${category.name}`} className="w-full">
                  <img src={category.logo} alt="logo" className="w-full object-cover" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* //advertise */}
        {advertiseLength ? <Advertise advertiseProducts={advertiseProducts} /> : <></>}
      </div>
      {/* question section */}
      <div className="bg-slate-200">
        <div className="Container">
          <div className="p-10">
            <h1 className="text-center text-3xl font-bold mb-5">
              Got Some Questions? Feel Free to Ask Us!
            </h1>
            <div className="flex justify-center items-center flex-col lg:flex-row">
              <div className="flex justify-between items-center lg:mr-20">
                <BsTelephoneForward className="mr-5 text-2xl text-orange-500" />
                <p className="text-2xl">Call us +88(01732321383)</p>
              </div>
              <div className="flex justify-between items-center">
                <AiOutlineMail className="mr-5 text-2xl text-orange-500" />
                <p className="text-2xl ">tanvir.rana1909@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
