import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../store/reducers/userReducer";
import { errorMessage } from "../store/reducers/toastReducer";
import ToastNotification from "../components/ToastNotification";

const Login = () => {
  const { errorMsg } = useSelector((state) => state.toastReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        dispatch(userLoginAction(user.email));
        navigate("/home");
      })
      .catch((err) => {
        dispatch(errorMessage(err.message));
      });
  };

  return (
    <>
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}

      <div className="bg-hero w-full h-[100vh] max-h-[auto] bg-center bg-cover object-cover px-[20px] overflow-y-auto pb-5">
        {/* logo div-- */}
        <div className="px-[20px] md:[110px] w-full flex items-center overflow-hidden bg-transparent z-50 h-[110px]">
          <img
            src={logo}
            alt="logo"
            className="w-[100px] md:w-[148px] h-[40px] object-cover"
          />
        </div>
        {/* login container-- */}
        <div className="h-[auto] sm:h-[550px] w-full sm:w-[450px] px-10 bg-[#00000080] mx-auto rounded-md py-10 overflow-y-auto">
          <h3 className="text-white text-[30px] py-3 md:py-5 font-bold">
            Sign In
          </h3>
          <form onSubmit={loginHandler}>
            {/* input-box-- */}
            <div className="my-[20px]">
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[50px] px-[10px] rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] px-[10px] rounded-md"
              />
            </div>
            <button className="bg-[#E50914] text-white h-[50px] w-full px-[15px] rounded-md font-bold transition-all  hover:bg-[#993131] my-3 md:my-5">
              Sign In
            </button>
          </form>
          <p className="text-[#afa9a9]">
            New to Netflix?
            <Link
              to={"/"}
              className="font-bold text-white transition-all hover:opacity-50"
            >
              Sign up now.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
