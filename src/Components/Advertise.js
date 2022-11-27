import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Link } from "react-router-dom";

const Advertise = ({advertiseProducts:products}) => {

  return (
    <>
      <div className="mb-28">
        <h1 className="text-center text-3xl font-bold">Hot Offers</h1>
        <p className="text-center text-orange-500 text-xl">Advertise</p>
        <div className="my-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {products.map((pro) => (
              <SwiperSlide key={pro._id}>
                <div className="border rounded-lg p-4">
                <div className="w-[280px] h-[283px]">
                  <img src={pro.img} alt="phon" className="w-full rounded-md object-cover" />
                </div>
                <div>
                  <p>Name: {pro.name}</p>
                  <p>Price: {pro.resalePrice}</p>
                  <Link to={`/categories/${pro.category}`} className="btn btn-sm my-2">Get</Link>
                </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Advertise;
