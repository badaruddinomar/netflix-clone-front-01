/* eslint-disable react/prop-types */
import defaultMovieBanner from "../assets/default-movie-banner.jpg";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { errorMessage, successMessage } from "../store/reducers/toastReducer";

const MovieCard = ({ movie }) => {
  const { user } = useSelector((state) => state.userReducer);
  const [movieAddedToWatchList, setMovieAddedToWatchList] = useState(false);
  const apiImageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_URL;
  const apiBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let image;
  if (movie.backdrop_path) {
    image = `${apiImageBaseUrl}${movie.backdrop_path}`;
  } else if (movie.poster_path) {
    image = `${apiImageBaseUrl}${movie.poster_path}`;
  } else {
    image = defaultMovieBanner;
  }
  let movieName;
  if (movie?.name) {
    movieName = movie?.name;
  } else {
    movieName = movie?.title;
  }
  // get single movie--
  const getSingleMovieHandler = async (movieId) => {
    const url = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
    const response = await fetch(url);
    const data = await response.json();

    if (data?.videos?.results[0]?.key) {
      return navigate(`/watch/${data?.videos?.results[0]?.key}/${data.id}`);
    } else {
      dispatch(errorMessage("Movie does not exist!"));
    }
  };
  // add to watchlist --
  const addToWatchListHandler = async (movieId) => {
    const url = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
    const apiResponse = await fetch(url);
    const apiData = await apiResponse.json();
    if (!apiData?.videos?.results[0]?.key) {
      dispatch(errorMessage("Movie does not exist!"));
      return;
    }

    try {
      const url = `${backendUrl}/watchList/create`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usermail: user,
          movieData: apiData,
          backdrop_path: apiData.backdrop_path,
          poster_path: apiData.poster_path,
        }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setMovieAddedToWatchList(true);
        dispatch(successMessage(data.message));
      } else {
        dispatch(errorMessage(data.message));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full px-2 hover:scale-[1.1] max-h-[auto] overflow-hidden group duration-100 transition-all relative">
        <img
          src={image}
          alt="movie-poster"
          className="object-cover w-full h-[170px] rounded-sm cursor-pointer"
        />
        <div className="h-100px bg-[#292727] invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 absolute bottom-0 left-0 w-full px-3 overflow-hidden hover:scale-[.94]">
          <p className="mb-1 p-2 text-[#bcb5b5]">{movieName?.slice(0, 25)}</p>
          <div className="flex items-center justify-between w-full p-2">
            <PlayCircleIcon
              style={{ color: "white", cursor: "pointer" }}
              onClick={() => getSingleMovieHandler(movie.id)}
            />

            {!movieAddedToWatchList ? (
              <AddIcon
                style={{ color: "white", cursor: "pointer" }}
                onClick={() => addToWatchListHandler(movie.id)}
              />
            ) : (
              <CheckIcon
                style={{ color: "greenyellow" }}
                onClick={() => addToWatchListHandler(movie.id)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
