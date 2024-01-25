import { useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";
import Pagination from "react-js-pagination";
import "../styles/paginationBox.css";
import ToastNotification from "../components/ToastNotification";
import { useSelector } from "react-redux";

const Movies = () => {
  const { errorMsg, successMsg } = useSelector((state) => state.toastReducer);
  const genreData = useFetch("genre/movie/list");
  const [genre, setGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const movies = useFetch(
    `discover/movie?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc`,
    currentPage,
    genre
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  return (
    <>
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      <Navbar />
      <Hero bgImage={"bg-moviehero"} />
      {/* container-- */}
      <div className="flex flex-col items-center justify-center px-[20px] lg:px-20 py-5 bg-black">
        {/* genres options-- */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="px-2 py-1 justify-self-start self-start rounded-sm outline-none w-[230px] bg-black text-white border-2 border-white"
        >
          <option value="" className="text-white bg-black outline">
            Categories
          </option>
          {genreData?.genres?.map((genre, ind) => {
            return (
              <option
                key={ind}
                value={genre.id}
                className="text-white bg-black border-2 border-white outline-none"
              >
                {genre.name}
              </option>
            );
          })}
        </select>
        {/* tv shows card */}
        <div className="flex flex-wrap items-center justify-center w-full my-5">
          {movies?.results?.map((tvShow, ind) => {
            return (
              <div key={ind} className="m-2 w-full sm:w-[250px]">
                <MovieCard movie={tvShow} />
              </div>
            );
          })}
        </div>
        {/* pagination box */}
        <div className="ctm-pagination-box">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={20}
            totalItemsCount={movies?.total_results || 0}
            onChange={setCurrentPageNo}
            nextPageText={">"}
            prevPageText={"<"}
            firstPageText={"<<"}
            lastPageText={">>"}
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      </div>
    </>
  );
};

export default Movies;
