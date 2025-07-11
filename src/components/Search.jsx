import { LuSearch } from "react-icons/lu";
import { useAppContext } from "../contexts/AppContext";

const Search = () => {
  const { setSearch } = useAppContext();

  return (
    <div className="px-3 hidden lg:flex items-center text-sm gap-2 border border-gray-300 rounded-full">
      <input
        onKeyUp={(e) => setSearch(e.target.value)}
        type="search"
        placeholder="Search products"
        className="p-1.5 w-full bg-transparent outline-none placeholder-gray-500"
      />
      <LuSearch className="text-lg opacity-60" />
    </div>
  );
};

export default Search;
