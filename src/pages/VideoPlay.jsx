import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReactPlayer from "react-player/lazy";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "react-js-pagination";
const VideoPlay = () => {
  const { key, movieId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  // get related movies--
  useEffect(() => {
    const getRelatedMoviesHandler = async () => {
      const url = `${apiBaseUrl}/movie/${movieId}/similar?language=en-US&page=${currentPage}&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setRelatedMovies(data);
    };
    getRelatedMoviesHandler();
  }, [apiBaseUrl, apiKey, movieId, currentPage]);

  return (
    <div className="w-full h-auto bg-black px-[20px]">
      <Navbar />
      <div className="flex items-center justify-center w-full">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${key}`}
          controls={true}
        />
      </div>
      {/* tv shows card */}
      <h4 className="text-white text-[20px] px-20">Related Movies</h4>
      <div className="flex flex-wrap items-center justify-center w-full py-10">
        {relatedMovies?.results?.map((movie, ind) => {
          return (
            <div key={ind} className="m-2 w-full sm:w-[250px]">
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>
      {/* pagination box */}
      <div className="ctm-pagination-box">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={20}
          totalItemsCount={relatedMovies?.total_results || 0}
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
  );
};

export default VideoPlay;
