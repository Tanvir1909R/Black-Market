import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bannerImg from "../assets/image/banner.png";
import Advertise from "../Components/Advertise";
import { urlProvider } from "../contexts/UrlContext";
import { BsTelephoneForward, BsShieldCheck, BsCashCoin, BsArrowRight } from "react-icons/bs";
import { AiOutlineMail, AiOutlineSafety } from "react-icons/ai";
import { FaMobileAlt, FaHandshake, FaSearchDollar, FaTruck } from "react-icons/fa";
import { MdVerified, MdSupportAgent } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import Loader from "../Components/Loader";
import { authProvider } from "../contexts/UserContext";

const Home = () => {
  const { baseUrl } = useContext(urlProvider);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(authProvider);
  const [advertiseProducts, setAdvertiseProducts] = useState([]);
  const [advertiseLength, setAdvertiseLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baseUrl}/categories`).then((res) => setCategories(res.data));
    axios
      .get(`${baseUrl}/advertiseProducts`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("blackToken")}`,
        },
      })
      .then((res) => {
        setAdvertiseProducts(res.data);
        setAdvertiseLength(res.data.length);
        setIsLoading(false);
      });
  }, [baseUrl]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="Container">
          <div className="hero min-h-[80vh] py-10">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-50"></div>
                <img
                  src={bannerImg}
                  className="w-[450px] relative z-10 drop-shadow-2xl"
                  alt="banner"
                />
              </div>
              <div className="max-w-xl">
                <div className="badge badge-outline badge-warning mb-4 p-3">
                  <FaMobileAlt className="mr-2" /> #1 Phone Resale Platform
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Buy & Sell <span className="text-orange-500">Phones</span> With Confidence
                </h1>
                <p className="py-6 text-gray-600 text-lg">
                  Your trusted marketplace for buying and selling used or new phones. 
                  Get the best deals on quality-verified smartphones from top brands. 
                  Sell your old phone hassle-free and upgrade to your dream device today!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register" className="btn btn-warning btn-lg gap-2">
                    Get Started <BsArrowRight />
                  </Link>
                  <Link to="/products" className="btn btn-outline btn-lg">
                    Browse Phones
                  </Link>
                </div>
                <div className="flex items-center gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <MdVerified className="text-green-500 text-xl" />
                    <span className="text-sm text-gray-600">Verified Sellers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsShieldCheck className="text-blue-500 text-xl" />
                    <span className="text-sm text-gray-600">Secure Payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-orange-500 py-14">
        <div className="Container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            <div>
              <h3 className="text-4xl font-bold">10K+</h3>
              <p className="text-orange-100">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">5K+</h3>
              <p className="text-orange-100">Phones Sold</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">500+</h3>
              <p className="text-orange-100">Verified Sellers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">99%</h3>
              <p className="text-orange-100">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="Container py-24 mt-7">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Browse By Brand</h2>
          <p className="text-orange-500 text-xl">Find Your Favorite Phone Brand</p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <Link
              to={`/categories/${category.name}`}
              key={category._id}
              className="group"
            >
              <div className="w-28 h-28 bg-white shadow-lg rounded-2xl p-4 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 group-hover:bg-orange-50 border border-gray-100">
                <img
                  src={category.logo}
                  alt={category.name}
                  className="w-full object-contain"
                />
              </div>
              <p className="text-center mt-3 font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-28">
        <div className="Container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-gray-600 text-lg">Simple steps to buy or sell your phone</p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearchDollar className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Browse & Select</h3>
              <p className="text-gray-600">
                Explore our wide range of quality-checked phones from verified sellers. 
                Filter by brand, price, and condition.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BsCashCoin className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Secure Payment</h3>
              <p className="text-gray-600">
                Pay securely using our trusted payment gateway. Your money is safe 
                until you receive and verify your phone.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTruck className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Get Your Phone</h3>
              <p className="text-gray-600">
                Receive your phone at your doorstep. Enjoy our hassle-free return 
                policy if you're not satisfied.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advertise Section */}
      <div className="Container py-24">
        {advertiseLength ? (
          <Advertise advertiseProducts={advertiseProducts} />
        ) : (
          <></>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-28">
        <div className="Container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">Why Choose Us?</h2>
            <p className="text-gray-400 text-lg">
              We make phone reselling safe, simple, and rewarding
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MdVerified className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Sellers</h3>
              <p className="text-gray-400">
                All sellers are verified for authenticity and reliability
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <AiOutlineSafety className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-400">
                Every phone goes through quality checks before listing
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Deals</h3>
              <p className="text-gray-400">
                Get competitive prices on both buying and selling
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MdSupportAgent className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400">
                Our support team is always ready to help you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="Container py-24 my-7">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">What Our Customers Say</h2>
          <p className="text-gray-600 text-lg">Real reviews from real customers</p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-1 text-yellow-400 mb-4">
              {"★★★★★".split("").map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <p className="text-gray-600 mb-6">
              "Sold my old iPhone within 2 days! The process was smooth and I got 
              a great price. Highly recommend this platform."
            </p>
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-orange-500 text-white rounded-full w-12">
                  <span>RK</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">Rahim Khan</p>
                <p className="text-sm text-gray-500">Seller</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-1 text-yellow-400 mb-4">
              {"★★★★★".split("").map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <p className="text-gray-600 mb-6">
              "Found an amazing deal on a Samsung Galaxy. The phone was exactly as 
              described. Trustworthy platform!"
            </p>
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-blue-500 text-white rounded-full w-12">
                  <span>SA</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">Sumaiya Akter</p>
                <p className="text-sm text-gray-500">Buyer</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-1 text-yellow-400 mb-4">
              {"★★★★★".split("").map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <p className="text-gray-600 mb-6">
              "Best place for phone deals! I've both bought and sold phones here. 
              The verified seller badge gives extra confidence."
            </p>
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-green-500 text-white rounded-full w-12">
                  <span>MH</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">Mehedi Hasan</p>
                <p className="text-sm text-gray-500">Buyer & Seller</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 py-20">
        <div className="Container text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers buying and selling phones on our platform. 
            It's free to get started!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn btn-lg bg-white text-orange-500 hover:bg-gray-100 border-0">
              Start Selling
            </Link>
            <Link to="/categories/Samsung" className="btn btn-lg btn-outline text-white hover:bg-white hover:text-orange-500">
              Browse Phones
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-20">
        <div className="Container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Got Questions?</h2>
            <p className="text-gray-600">We're here to help you 24/7</p>
          </div>
          <div className="flex justify-center items-center flex-col lg:flex-row gap-8">
            <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <BsTelephoneForward className="text-xl text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Call us</p>
                <p className="text-lg font-semibold">+88 01732321383</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AiOutlineMail className="text-xl text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email us</p>
                <p className="text-lg font-semibold">tanvir.rana1909@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
