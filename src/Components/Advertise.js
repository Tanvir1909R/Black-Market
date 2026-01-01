import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Link } from "react-router-dom";
import { FaFire, FaArrowRight } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Advertise = ({ advertiseProducts: products }) => {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 rounded-full mb-4">
          <FaFire className="animate-pulse" />
          <span className="font-semibold">Hot Deals</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-3">Featured Phones</h2>
        <p className="text-gray-500 text-lg">
          Don't miss out on these amazing deals from verified sellers
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="advertise-swiper pb-12"
      >
        {products.map((pro) => (
          <SwiperSlide key={pro._id}>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={pro.img}
                  alt={pro.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                    HOT
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                    {pro.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                  {pro.name}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <span>{pro.sellerName}</span>
                  {pro.userVerified && (
                    <BsFillCheckCircleFill className="text-blue-500" />
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-orange-500">
                      ৳{pro.resalePrice}
                    </p>
                    {pro.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        ৳{pro.originalPrice}
                      </p>
                    )}
                  </div>
                  {pro.originalPrice && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded">
                      {Math.round(
                        ((pro.originalPrice - pro.resalePrice) / pro.originalPrice) * 100
                      )}
                      % OFF
                    </span>
                  )}
                </div>

                <Link
                  to={`/categories/${pro.category}`}
                  className="w-full btn bg-orange-500 hover:bg-orange-600 text-white border-none gap-2"
                >
                  View Deal <FaArrowRight />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Link */}
      <div className="text-center mt-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors"
        >
          View All Products <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Advertise;
