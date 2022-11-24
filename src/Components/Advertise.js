import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { urlProvider } from "../contexts/UrlContext";
import axios from "axios";

const  Advertise = ()=> {
    const {baseUrl} = useContext(urlProvider)
    const [products, setProducts] = useState([])

    useEffect(()=>{
        axios.get(`${baseUrl}/advertiseProducts`).then(res => setProducts(res.data))
    },[baseUrl])
    
  return (
    <>
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
        {
            products.map((pro) =><SwiperSlide key={pro._id}>
                <div>
                    <img src={pro.img} alt="" />
                </div>
            </SwiperSlide>)
            
        }
      </Swiper>
    </>
  );
}

export default Advertise
