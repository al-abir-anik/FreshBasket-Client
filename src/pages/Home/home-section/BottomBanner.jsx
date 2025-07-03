import { assets, features } from "../../../assets/assets";

const BottomBanner = () => {
  return (
    <div className="w-11/12 mx-auto relative mt-26">
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold text-primary mb-6">
            Why We Are the Best?
          </h2>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 mt-3">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-9 md:w-11"
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
