import { Link } from "react-router-dom";

const Featured = () => {
  return (
    <div className="w-5/6 lg:w-3/4 mx-auto mt-20 mb-20 space-y-14">
      <div className="space-y-5">
        <h2 className="text-[#2D2A6E] text-4xl font-semibold text-center tracking-wider">
          Featured Foods
        </h2>
        <p className="w- text-[#4D5574] text-base font-medium text-center">
          Magento extension to create content by drag and drop builtin
          controls.Magento extension to create <br /> content by drag and drop
          builtin controls.
        </p>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {movieData.map((movie) => (
              <MovieCard key={movie._id} movie={movie}></MovieCard>
            ))}
          </div> */}
      <button className="btn">
        <Link to={"/allMovies"}>See All Movies</Link>
      </button>
    </div>
  );
};

export default Featured;
