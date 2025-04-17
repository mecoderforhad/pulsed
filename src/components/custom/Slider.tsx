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
    url: "https://static.vecteezy.com/system/resources/previews/007/301/684/non_2x/pet-shop-banner-design-template-cartoon-illustration-of-cats-dogs-house-food-vector.jpg",
    caption: "Electric Scooter.",
  },
  {
    url: "https://static.vecteezy.com/system/resources/previews/045/125/824/non_2x/various-breeds-of-dogs-peek-out-from-behind-a-wooden-fence-concept-for-pets-veterinary-clinic-or-nutrition-food-for-dogs-banner-with-space-for-text-photo.jpg",
    caption: "Scooter.",
  },
  {
    url: "https://c8.alamy.com/comp/2R0M39W/advertising-poster-pet-shop-sale-cute-dog-and-discount-offer-on-light-background-banner-design-2R0M39W.jpg",
    caption: "Scooter.",
  },
  {
    url: "https://t4.ftcdn.net/jpg/03/17/04/61/360_F_317046136_p8XC7kCPSyelhxe54mbXWJbUI6iMShM7.jpg",
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
                backgroundPosition: "center",
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
