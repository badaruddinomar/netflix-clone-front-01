/* eslint-disable react/prop-types */
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = ({ linkTitle, linkPath }) => {
  return (
    <header className="w-full flex items-center justify-center h-[100px]  overflow-hidden bg-transparent z-50">
      {/* container-- */}
      <div className="w-full px-0 py-[22px] md:px-[48px] flex items-center justify-between">
        <div className="w-[100px] md:w-[148px]">
          <img src={logo} alt="logo" className="w-full h-[40px] object-cover" />
        </div>
        <div>
          <Link
            to={`${linkPath}`}
            className="bg-[#E50914] text-white py-[8px] px-[15px] rounded-md font-bold transition-all  hover:bg-[#993131]"
          >
            {linkTitle}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
