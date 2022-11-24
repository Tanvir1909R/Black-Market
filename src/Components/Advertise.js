import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const Advertise = ({advertiseProducts:products}) => {

  return (
    <>
      <div className="mb-28">
        <h1 className="text-center text-3xl font-bold">Hot Offers</h1>
        <p className="text-center text-orange-500 text-xl">Advertise</p>
        <div>
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
                <div>
                  <img src={pro.img} alt="phon" />
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
