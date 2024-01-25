import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  clearErrorMessage,
  clearSuccessMessage,
} from "../store/reducers/toastReducer";

// eslint-disable-next-line react/prop-types
const ToastNotification = ({ classname, text }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (classname === "success") {
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
    } else if (classname === "error") {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 3000);
    }
  }, [dispatch, classname]);
  return (
    <div
      className={`${
        classname === "success" ? "translate-x-0" : "translate-x-0"
      } z-[100] fixed top-[100px] right-0 px-[20px] py-[15px] bg-black min-w-[200px] transition-all translate-x-[100%] rounded-l-md flex items-center text-center }`}
    >
      {classname === "success" ? (
        <CheckCircleOutlineIcon style={{ color: "#50e050" }} />
      ) : (
        <ErrorOutlineIcon style={{ color: "red" }} />
      )}
      <p
        className={`font-primary text-[16px] ml-2 capitalize transition-all ${
          classname === "success" ? "text-[#50e050]" : "text-[tomato]"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default ToastNotification;
