/* eslint-disable react/prop-types */
import logo from "../assets/logo.png";
import { navLinks } from "../data/data";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userSignoutAction } from "../store/reducers/userReducer";
import { searchValueAction } from "../store/reducers/searchReducer";
import ClearIcon from "@mui/icons-material/Clear";
import LogoutIcon from "@mui/icons-material/Logout";
import Menubar from "./Menubar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [menuToggle, setMenuToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // scroll handlers--
  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.scrollY === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);
  // signout handler--
  const signOutHandler = () => {
    signOut(firebaseAuth);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        dispatch(userSignoutAction());
        navigate("/");
      }
    });
  };
  // search handler--
  const searchHandler = () => {
    setSearchShow(true);
    if (searchValue) {
      dispatch(searchValueAction(searchValue));
      navigate("/search");
    }
  };
  // menu bar toggle handler--
  const menuBarToggleHandler = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <nav
      className={`w-full h-[100px]  sticky top-0 left-0 ${
        isScrolled ? "bg-black" : "bg-transparent "
      } flex items-center justify-between px-[20px] md:px-[80px] z-50`}
    >
      {/* left div-- */}
      <div className="flex items-center">
        <Link to={"/home"}>
          <img
            src={logo}
            alt="logo"
            className={`${
              searchShow ? "hidden" : "block"
            } md:block w-[100px] md:w-[128px]`}
          />
        </Link>
        <ul className="hidden lg:flex lg:items-center lg:mx-10">
          {navLinks.map((navlink) => {
            return (
              <li key={navlink.title} className="mx-3">
                <Link
                  to={navlink.path}
                  className="text-white transition-all hover:opacity-70 "
                >
                  {navlink.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* menubar for mobile device */}
      <Menubar showMenu={menuToggle} />
      {/* right div */}
      <div className="flex items-center">
        <form>
          {/* search box-- */}
          <div
            className={`${
              searchShow
                ? "bg-transparent border-2 w-[300px] border-white px-2 rounded-md"
                : ""
            } flex  h-[40px] items-center transition-all`}
          >
            <ClearIcon
              onClick={() => setSearchShow(false)}
              style={{
                display: `${searchShow ? "inline-block" : "none"}`,
                cursor: "pointer",
                color: "white",
              }}
            />
            <label htmlFor="search"></label>
            <input
              type="text"
              id="search"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={`${
                searchShow ? "visible opacity-100" : "invisible opacity-0"
              } flex-1 w-[80%] h-full border-none outline-none transition-all bg-transparent text-white`}
            />
            <SearchIcon
              style={{
                cursor: "pointer",
                color: "white",
              }}
              onClick={searchHandler}
            />
          </div>
        </form>
        <button
          type="button"
          onClick={signOutHandler}
          className="bg-[#E50914] text-white py-[8px] px-[10px] md:px-[15px] text-[12px] rounded-md font-bold transition-all  hover:bg-[#993131] mx-5 hidden md:inline-block"
        >
          Sign Out
        </button>
        <div className="block mx-2 md:mx-5 lg:hidden">
          <LogoutIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={signOutHandler}
          />
        </div>
        {/* humburger for mobile device-- */}
        <div className="block lg:hidden ">
          {menuToggle ? (
            <CloseIcon
              style={{ color: "white", cursor: "pointer" }}
              onClick={menuBarToggleHandler}
            />
          ) : (
            <MenuIcon
              style={{ color: "white", cursor: "pointer" }}
              onClick={menuBarToggleHandler}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
