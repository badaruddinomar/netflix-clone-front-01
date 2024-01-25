/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { navLinks } from "../data/data";

const Menubar = ({ showMenu }) => {
  return (
    <menu
      className={`${
        showMenu ? "opacity-100 visible" : "opacity-0 invisible"
      } absolute top-[100px] right-[30px] w-[200px] transition-all duration-300`}
    >
      <ul className="flex flex-col items-start justify-start px-5 py-4 bg-black rounded-b-md">
        {navLinks.map((navlink) => {
          return (
            <li key={navlink.title} className="my-3">
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
    </menu>
  );
};

export default Menubar;
