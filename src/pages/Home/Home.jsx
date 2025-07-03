import MainBanner from "./home-section/MainBanner";
import Categories from "./home-section/Categories";
import BestSeller from "./home-section/BestSeller";
import BottomBanner from "./home-section/BottomBanner";

const Home = () => {
  // const allFoods = useLoaderData();

  return (
    <main className="mt-10 w-11/12 mx-auto">
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />

      <section>{/* <Featured allFoods={allFoods}></Featured> */}</section>
    </main>
  );
};

export default Home;
