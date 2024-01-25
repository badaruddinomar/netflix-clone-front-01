import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import TvShows from "./pages/TvShows";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import Search from "./pages/Search";
import VideoPlay from "./pages/VideoPlay";
import ScrollToTop from "./components/ScrollToTop";
import MyLists from "./pages/MyLists";
function App() {
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/tv-shows" element={<TvShows />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watch/:key/:movieId" element={<VideoPlay />} />
            <Route path="/my-lists" element={<MyLists />} />
          </>
        ) : (
          <></>
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
