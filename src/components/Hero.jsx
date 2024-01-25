/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import heroVideo from "../assets/hero-video.mp4";

const Hero = ({ bgImage }) => {
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);

  // video popup close handler--
  const videoPopupCloseHandler = (e) => {
    if (e.target.classList.contains("video-popup")) {
      setVideoPopupOpen(false);
    }
  };
  return (
    <>
      {/* video popup backdrop-- */}
      <div
        className={`absolute top-0 left-0 z-[-1] ${bgImage} w-full h-[100vh] bg-no-repeat bg-cover bg-center`}
      ></div>
      {/* hero container-- */}
      <div className="h-[80vh] px-[20px] py-[100px] md:py-0">
        <div className="h-[300px] px-[20px] lg:px-20 mt-10 hidden md:block">
          <div className="z-20 hidden object-cover w-full h-full bg-no-repeat bg-hometitle md:block"></div>
        </div>
        <div>
          <h1 className="font-ternary text-[40px] font-bold md:hidden block my-5 text-white">
            Explore Latest Movies And Tv Sereis
          </h1>
        </div>
        <div className="flex items-center px-[0] md:px-20">
          <Link
            to={"#"}
            onClick={() => setVideoPopupOpen(true)}
            className="px-4 py-1 mr-1 transition-all bg-white rounded-sm md:mx-3 hover:opacity-70"
          >
            <PlayArrowIcon /> Play
          </Link>
          <Link
            to={"#"}
            className="px-4 py-1 mx-1 md:mx-3 transition-all bg-[gray]  text-white rounded-sm hover:opacity-70"
          >
            <InfoIcon /> More Info
          </Link>
          {/* video popup window-- */}
          {videoPopupOpen && (
            <div
              onClick={videoPopupCloseHandler}
              className="video-popup fixed bg-[#000000b6] w-full h-full top-0 left-0 flex items-center justify-center px-2 cursor-pointer transition-all duration-75 z-40"
            >
              <video
                src={heroVideo}
                controls
                muted
                loop
                className="w-full sm:w-[600px] px-3 rounded-md  z-70"
              ></video>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
