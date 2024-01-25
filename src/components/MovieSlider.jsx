/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";
import "../styles/paginationBox.css";

const MovieSlider = ({ movieLists, title }) => {
  // slider options/settings--
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 5000,
    focusOnSelect: false,
    lazyLoad: "progressive",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-full h-auto px-10 py-5 bg-black lg:px-20">
      <h3 className="text-white text-[20px] my-3 font-bold">{title}</h3>
      <Slider {...sliderSettings} className="px-2">
        {movieLists?.map((movie, ind) => {
          return (
            <div key={ind}>
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default MovieSlider;
