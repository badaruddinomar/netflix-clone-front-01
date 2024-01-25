import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userSignoutAction } from "../store/reducers/userReducer";
import { useFetch } from "../hooks/useFetch";
import MovieSlider from "../components/MovieSlider";
import Hero from "../components/Hero";
import ToastNotification from "../components/ToastNotification";

const Home = () => {
  const { errorMsg, successMsg } = useSelector((state) => state.toastReducer);
  const trendingMovies = useFetch("trending/movie/day", 1);
  const trendingTvList = useFetch("trending/tv/day");
  const popularMovies = useFetch("movie/popular");
  const topRatedMovies = useFetch("movie/top_rated");
  const upcomingMovies = useFetch("movie/upcoming");
  const nowPlayingMovies = useFetch("movie/now_playing");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        dispatch(userSignoutAction());
        navigate("/");
      }
    });
  }, [navigate, dispatch]);

  return (
    <>
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      <div className="relative w-full">
        <Navbar />
        <Hero bgImage={"bg-home"} />
        {/* movie list container-- */}
        <MovieSlider
          movieLists={trendingMovies?.results}
          title={"Trending Movies"}
        />
        {/* tv list container */}
        <MovieSlider
          movieLists={trendingTvList?.results}
          title={"Trending TV Series"}
        />
        {/* popular movies on netflix */}
        <MovieSlider
          movieLists={popularMovies?.results}
          title={"Popular Movies On Netflix"}
        />
        {/* Top rated movies */}
        <MovieSlider
          movieLists={topRatedMovies?.results}
          title={"Toprated Movies"}
        />
        {/* upcoming movies */}
        <MovieSlider
          movieLists={upcomingMovies?.results}
          title={"Upcoming Movies"}
        />
        {/* now playing movies */}
        <MovieSlider
          movieLists={nowPlayingMovies?.results}
          title={"Now Playing Movies"}
        />
      </div>
    </>
  );
};

export default Home;
