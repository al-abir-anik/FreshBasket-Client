import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  const slides = [
    {
      id: 1,
      img: "https://i.ibb.co.com/Tk32mJD/10927.jpg",
      alt: "Fried eggs with vegetables",
      description:
        "Eggs ham olives tomatoes and fresh salad Ketogenic paleo diet Keto breakfast Brunch",
    },
    {
      id: 2,
      img: "https://i.ibb.co.com/V2pb3H9/10882.jpg",
      alt: "Italian pasta shells with mushrooms",
      description:
        "Penne pasta in tomato sauce with meat, tomatoes decorated with pea sprouts on a dark table.",
    },

    {
      id: 3,
      img: "https://i.ibb.co.com/6HJVPtc/11971.jpg",
      alt: "Traditional Ukrainian Russian borscht",
      description:
        "Traditional Ukrainian Russian borscht or red soup on the bowl. Banner. Top view",
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
        className="w-full lg:h-[50rem] md:h-[30rem] h-96"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.img})`,
              }}
            >
              <div className="bg-black/40 w-full h-full">
                <div className="w-2/6 h-full lg:ml-40 md:ml-20 ml-10 flex flex-col justify-center lg:gap-16 gap-8">
                  <h2 className="text-white text-5xl font-bold">{slide.alt}</h2>
                  <p className="w-3/4 text-white text-xl font-normal">
                    {slide.description}
                  </p>
                  <button className="btn w-fit uppercase">Shop Now</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
