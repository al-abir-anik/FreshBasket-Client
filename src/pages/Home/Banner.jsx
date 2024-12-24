import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  const slides = [
    {
      id: 1,
      img: "https://i.ibb.co.com/zVZCgFH/1xtKO9d.jpg",
      // alt: "Australia",
    },
    {
      id: 2,
      img: "https://i.ibb.co.com/nCJdWj3/wp1930550-better-call-saul-wallpapers.jpg",
      // alt: "Sydney, NSW, Australia",
    },

    {
      id: 3,
      img: "https://i.ibb.co.com/ncv7Ws2/wp4662517.jpg",
      // alt: "Sơn Trà, Đà Nẵng, Vietnam",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="w-full h-[50rem]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.img})`,
              }}
            >
              <div className="bg-black/40 w-full h-full flex justify-center items-center">
                <h2 className="text-white text-4xl font-bold">{slide.alt}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
