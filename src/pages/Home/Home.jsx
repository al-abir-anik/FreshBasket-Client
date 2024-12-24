import Banner from "./Banner";
import Featured from "./Featured";

const Home = () => {
  return (
    <div>
      <header>
        <Banner></Banner>
        <div className="w-full h-14 bg-[#2D2A6E] flex justify-center items-center">
          <p className="text-white">
            The perfect theme for{" "}
            <span className="font-medium uppercase text-[#96AE00]">
              Beginners
            </span>{" "}
            or{" "}
            <span className="font-medium uppercase text-[#96AE00]">
              Professionals
            </span>{" "}
            - Absolutely no coding knowledge required!
          </p>
        </div>
      </header>

      <main>
        {/* Featured Foods Section */}
        <section>
          <Featured></Featured>
        </section>

        <section></section>
      </main>
    </div>
  );
};

export default Home;
