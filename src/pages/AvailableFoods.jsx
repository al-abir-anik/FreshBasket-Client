import FoodCard from "../components/FoodCard";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";
import { CiSearch } from "react-icons/ci";

const AvailableFoods = () => {
  const { loading } = useContext(AuthContext);
  const [search, setSearch] = useState([]);
  const [sortExpiry, setSortExpiry] = useState(false);
  const [column, setColumn] = useState(false);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(
      `https://food-bridge-server-hazel.vercel.app/foods?sort=${sortExpiry}&search=${search}`
    )
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((error) => console.log(error.message));
  }, [sortExpiry, search]);

  if (loading) {
    return (
      <div className="flex justify-center flex-grow items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-5/6 lg:w-3/4 mx-auto my-20">
      {/* Header Section */}
      <header className=" p-6 rounded-lg mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Available Foods
        </h1>
        <p className="text-gray-700 mt-3 text-lg">
          Discover a wide selection of delicious meals ready for donation. Use
          the tools below to search, sort, and customize your view.
        </p>
      </header>

      {/* Sorting, Toggle, and Search */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className=" flex gap-2 items-center flex-grow ">
          <div className="w-10 h-10 ml-4 rounded-lg bg-gray-100 flex justify-center items-center">
            <CiSearch className="text-2xl text-gray-500"></CiSearch>
          </div>
          <input
            onKeyUp={(e) => setSearch(e.target.value)}
            type="text"
            placeholder={`Search by food name`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            onClick={() => setSortExpiry(!sortExpiry)}
            className={`btn ${
              sortExpiry ? "btn-success" : "btn-info"
            }  text-white uppercase`}
          >
            {sortExpiry ? "Sorted by Expire Date" : "Sort by Expire Date"}
          </button>
        </div>
        <div>
          <button
            onClick={() => setColumn(!column)}
            className={`btn ${
              column ? "btn-success" : "btn-info"
            }  text-white uppercase`}
          >
            {column ? "3 COLUMN" : "2 COLUMN"}
          </button>
        </div>
      </div>

      <main className="mt-14 mb-20 space-y-14">
        <div
          className={`grid grid-cols-1 md:grid-cols-2  ${
            column ? "lg:grid-cols-2" : "lg:grid-cols-3"
          }  gap-12 justify-center`}
        >
          {foods.map((food) => (
            <FoodCard key={food._id} food={food}></FoodCard>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AvailableFoods;
