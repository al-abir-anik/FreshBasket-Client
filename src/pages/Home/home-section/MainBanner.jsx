import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";

const MainBanner = () => {
  return (
    <div className="relative">
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full min-h-[60vh] hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-20 lg: pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center md:text-left max-w-72 md:mx-w-80 lg:max-w-[27rem] xl:max-w-[32rem] leading-tight lg:leading-15 xl:leading-20">
          Freshness You can trust, Savings You will Love!
        </h1>
        <div className="flex items-center mt-8 font-medium">
          <Link
            to={"/all-products"}
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
          >
            Shop Now
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="md:hidden transition group-hover:translate-x-1"
            />
          </Link>

          <Link className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer">
            Explore Deals
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
