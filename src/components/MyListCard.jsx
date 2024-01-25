/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import defaultMovieBanner from "../assets/default-movie-banner.jpg";
import { useSelector, useDispatch } from "react-redux";
import { errorMessage, successMessage } from "../store/reducers/toastReducer";

const MyListCard = ({ movie, reRenderHandler }) => {
  const { user } = useSelector((state) => state.userReducer);
  const apiImageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_URL;
  const apiBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  // remove from watchlist --
  const removeMoviesHanlder = async (backdrop_path, poster_path) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/watchlist/delete`;
    const options = {
      method: "POST",
      body: JSON.stringify({ usermail: user, backdrop_path, poster_path }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      dispatch(successMessage(data.message));
      reRenderHandler();
    } else {
      dispatch(errorMessage(data.message));
    }
  };

  return (
    <div className="w-full sm:w-[250px] hover:scale-[1.1] overflow-hidden group duration-100 transition-all relative flex items-center flex-wrap my-[5px]">
      <img
        src={image}
        alt="movie-poster"
        className="object-cover w-full h-[170px] rounded-sm cursor-pointer"
      />
      <div className="h-100px bg-[#292727] invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 absolute bottom-0 left-0 w-full px-3">
        <p className="mb-1 p-2 text-[#bcb5b5]">{movieName?.slice(0, 25)}</p>
        <div className="flex items-center justify-between w-full p-2">
          <PlayCircleIcon
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => getSingleMovieHandler(movie.id)}
          />
          <ClearIcon
            style={{ color: "white", cursor: "pointer" }}
            onClick={() =>
              removeMoviesHanlder(movie.backdrop_path, movie.poster_path)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MyListCard;
