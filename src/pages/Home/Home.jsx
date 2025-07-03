import { useLoaderData } from "react-router-dom";
import Banner from "./Banner";
import Featured from "./Featured";
import MainBanner from "../../components/MainBanner";

const Home = () => {
  const allFoods = useLoaderData();

  return (
    <main className="mt-10 w-11/12 mx-auto">
      <section className="">
        {/* <Banner></Banner> */}
        <MainBanner />
        <div className="w-full h-14 bg-[#2D2A6E] flex justify-center items-center">
          <p className="text-white">
            The perfect place for{" "}
            <span className="font-medium uppercase text-[#96AE00]">food</span>{" "}
            <span className="font-medium uppercase text-[#96AE00]">lovers</span>{" "}
            - FoodBridge...
          </p>
        </div>
      </section>

      {/* Featured Foods Section */}
      <section>
        <Featured allFoods={allFoods}></Featured>
      </section>
    </main>
  );
};

export default Home;
