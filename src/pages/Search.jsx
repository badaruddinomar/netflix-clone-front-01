import { useState } from "react";
import Navbar from "../components/Navbar";
import { useFetch } from "../hooks/useFetch";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import Pagination from "react-js-pagination";

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchedValue } = useSelector((state) => state.searchReducer);
  const searchedMovies = useFetch(
    "search/movie",
    currentPage,
    undefined,
    searchedValue
  );
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  return (
    <div className="bg-black">
      <Navbar />
      {/* container */}
      <div className="flex flex-col items-center justify-center px-20 py-5 bg-black">
        {/* tv shows card */}
        <div className="flex flex-wrap items-center justify-center w-full my-5">
          {searchedMovies?.results?.map((tvShow, ind) => {
            return (
              <div key={ind} className="m-2">
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
            totalItemsCount={searchedMovies?.total_results || 0}
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
    </div>
  );
};

export default Search;
