import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { dogs } from "../../_mock/products";

export default function EcommerceSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.params.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="bg-[#0e1b2a] py-6 px-4 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-bold">Trending Products</h2>
        <div className="flex space-x-2">
          <button
            ref={prevRef}
            className="swiper-button-prev-custom bg-[#1e2a38] hover:bg-[#2e3a48] text-white rounded-full p-2"
          >
            <FaArrowAltCircleLeft size={20} />
          </button>
          <button
            ref={nextRef}
            className="swiper-button-next-custom bg-[#1e2a38] hover:bg-[#2e3a48] text-white rounded-full p-2"
          >
            <FaArrowAltCircleRight size={20} />
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="productSwiper"
      >
        {dogs.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-[#1e2a38] text-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="w-full aspect-w-4 aspect-h-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-green-400">
                    {product.price}
                  </span>
                  <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
