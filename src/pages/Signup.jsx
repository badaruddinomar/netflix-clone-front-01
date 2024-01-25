import { useState } from "react";
import Header from "../components/Header";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../store/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { errorMessage } from "../store/reducers/toastReducer";
import ToastNotification from "../components/ToastNotification";

const Signup = () => {
  const { errorMsg } = useSelector((state) => state.toastReducer);
  const [btnShow, setBtnShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = (e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          dispatch(userLoginAction(user.email));
          navigate("/home");
        })
        .catch((err) => {
          dispatch(errorMessage(err.message));
        });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(errorMsg);
  return (
    <>
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      <div className="w-full h-[100vh] bg-hero bg-opacity-30 object-cover bg-no-repeat bg-center bg-cover relative px-[20px] max-h-[auto] overflow-y-auto pb-5">
        <Header linkTitle={"Sign In"} linkPath={"/login"} />
        {/* CONTAINER-- */}
        <div className="w-full h-[80vh] max-h-[100vh] flex md:items-center justify-center flex-col z-20">
          <h1 className="text-white text-[30px] font-ternary lg:text-[50px] font-extrabold z-30 leading-[1.6]">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-white text-[20px] lg:text-[25px] font-primary my-1 lg:my-3 leading-[1.5] z-30">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-white text-[16px] md:text-[20px] font-primary leading-[1.6] z-30">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          {/*  SIGNUP FORM-- */}
          <form
            className="flex flex-col items-center justify-center my-3 md:m-5 "
            onSubmit={signupHandler}
          >
            {/*FORM CONTAINER-- */}
            <div className="flex flex-col items-center lg:flex-row">
              {/* INPUT BOX-- */}
              <div>
                <label htmlFor="email"></label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent my-2 border-2 h-[50px] md:h-[70px] px-5 text-white placeholder:text-white outline-none w-full lg:w-[400px] inline-block rounded-md"
                />
              </div>
              {/* TOGGLER BUTTON--*/}
              <button
                type="button"
                onClick={() => email && setBtnShow(true)}
                className={`bg-[#E50914]  h-[50px] md:h-[70px] px-5 text-white text-[16px] md:text-[25px] font-bold rounded-md mx-2 hover:bg-[#993131] transition-all flex items-center ${
                  btnShow ? "opacity-0 hidden" : "opacity-100 block"
                }`}
              >
                Get Started
                <ChevronRightIcon
                  style={{ fontSize: "40px", display: "inline-block" }}
                />
              </button>
              {/* INPUT BOX-- */}
              <div>
                <label htmlFor="password"></label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-transparent border-2 h-[50px] md:h-[70px]  mx-0 md:mx-2 px-5 text-white placeholder:text-white outline-none w-full lg:w-[400px] inline-block rounded-md ${
                    btnShow ? "block opacity-100" : "hidden opacity-0"
                  }`}
                />
              </div>
            </div>
            {/* SUBMIT FORM BUTTON-- */}
            <button
              className={`bg-[#E50914] h-[50px] md:h-[60px] my-2 md:my-[5] px-5 text-white text-[16px] md:text-[25px] font-bold rounded-md mx-2 hover:bg-[#993131] transition-all flex items-center ${
                btnShow ? "block opacity-100" : "hidden opacity-0"
              }`}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
