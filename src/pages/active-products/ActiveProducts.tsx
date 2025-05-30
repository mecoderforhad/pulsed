import "swiper/css";
import Login from "./Login";
import Swal from "sweetalert2";
import "swiper/css/navigation";
import { Tooltip } from "flowbite-react";
import { useNavigate } from "react-router";
import { Navigation } from "swiper/modules";
import { truncateText } from "../../util/format";
import { useAuth } from "../../provider/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Swiper as SwiperType, NavigationOptions } from "swiper/types";
import ActiveIndicator from "../../components/ui/Indicator";

export default function ActiveProducts() {
  const [data, setData] = useState<any>([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType>(null);
  const navigate = useNavigate();
  const authUser = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/products`,
          {
            headers: {
              Authorization: `Bearer ${authUser?.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setData(data);
      } catch (err: any) {
        setError(err.message);
        Swal.fire("Error", err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [authUser?.token]);

  useEffect(() => {
    const swiper = swiperRef.current;
    const prevEl = prevRef.current;
    const nextEl = nextRef.current;

    if (swiper && prevEl && nextEl) {
      const navigationParams = swiper.params.navigation as NavigationOptions;

      navigationParams.prevEl = prevEl;
      navigationParams.nextEl = nextEl;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/${authUser?.user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${authUser?.token}`,
            },
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (err: any) {
        console.log(err.message);
        Swal.fire("Error", err.message, "error");
      }

      // finally {
      //   setLoading(false);
      // }
    };

    fetchProducts();
  }, [authUser?.token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-gray-50">Error: {error}</div>;

  const handleOrder = async (product: any) => {
    const formData = {
      userId: authUser?.user?.id,
      // txHash: "",
      items: [{ productId: product?.id, quantity: 1 }],
      totalAmount: product?.price,
      paymentMethod: "manual",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/orders/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create order");
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Order is created successfully!",
        confirmButtonText: "OK",
      });

      // Optional: redirect or clear state
      // navigate("/orders");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <>
      <div className="bg-[#0e1b2a] py-6 px-4 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-2xl font-bold">Active Products Page</h2>
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
          {data
            ?.filter((product: any) =>
              userInfo?.orders?.some((order) =>
                order?.items?.some((item) => item?.productId === product.id)
              )
            )
            .map((product: any) => (
              <SwiperSlide key={product.id}>
                <div className="bg-[#1e2a38] text-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <ActiveIndicator />

                  <div className="w-full aspect-w-4 aspect-h-3">
                    <img
                      src={`${product?.images[0]?.url}`}
                      alt={product.title}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-2">
                        <Tooltip
                          content={product.description}
                          placement="top"
                          arrow={false}
                          style="light"
                        >
                          <span className="cursor-pointer">
                            {truncateText(product.description, 50)}
                          </span>
                        </Tooltip>
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-green-400">
                        ${product.price}
                      </span>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                        onClick={() => {
                          if (authUser?.token) {
                            navigate("/payment", { state: { product } });
                            handleOrder(product);
                          } else {
                            setOpenModal(!openModal);
                          }
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
