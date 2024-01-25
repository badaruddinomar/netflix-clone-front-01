import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import MyListCard from "../components/MyListCard";
import ToastNotification from "../components/ToastNotification";

const MyLists = () => {
  const { errorMsg, successMsg } = useSelector((state) => state.toastReducer);

  const { user } = useSelector((state) => state.userReducer);
  const [movieList, setMovieList] = useState([]);
  // this state for re rendering the page when the item gets deleted
  const [itemDeleted, setItemDeleted] = useState(false);

  useEffect(() => {
    const fetchHandler = async () => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/watchList/movies`;
      const options = {
        method: "POST",
        body: JSON.stringify({ usermail: user }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setMovieList(data?.data?.movies);
    };
    fetchHandler();
  }, [user, itemDeleted]);
  // re render the if item gets deleted--
  const reRenderHandler = () => {
    setItemDeleted(!itemDeleted);
  };
  return (
    <>
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      <div className="w-full bg-black">
        <Navbar />
        {/* container-- */}
        <div className="flex justify-center flex-wrap px-[20px] py-[20px] sm:px-20 sm:py-20 h-[auto] min-h-screen">
          {movieList?.map((movie, ind) => {
            return (
              <div
                key={ind}
                className="flex flex-wrap items-center justify-center w-full sm:w-[250px] py-[10px] px-[10px]"
              >
                <MyListCard movie={movie} reRenderHandler={reRenderHandler} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyLists;
