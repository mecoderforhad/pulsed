// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "./style.css";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

const images = [
  {
    url: "/public/assets/images/img1.jpg",
    caption: "Electric Scooter.",
  },
  {
    url: "/public/assets/images/img2.jpg",
    caption: "Scooter.",
  },
  {
    url: "/public/assets/images/img3.jpg",
    caption: "Scooter.",
  },
  {
    url: "/public/assets/images/img5.jpg",
    caption: "Scooter.",
  },
];

export default function Slider() {
  return (
    <div>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="swiper-slide-content"
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                height: "500px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
              }}
            >
              {/* <h2>{image.caption}</h2> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
