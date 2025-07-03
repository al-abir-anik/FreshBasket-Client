import MainBanner from "./home-section/MainBanner";
import Categories from "./home-section/Categories";
import BestSeller from "./home-section/BestSeller";
import BottomBanner from "./home-section/BottomBanner";
import NewsLetter from "./home-section/NewsLetter";

const Home = () => {
  return (
    <div className="mt-10 w-11/12 mx-auto">
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
