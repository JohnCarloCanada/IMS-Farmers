import React, { useContext } from "react";
import LoginContext from "../context/loginContext";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const { setIsLogin } = useContext(LoginContext);
  /* const navigate = useNavigate(); */

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsLogin("");
    /*     navigate("/"); */
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#f2c0c0]">
      <div className="px-6 sm:px-7 py-10 sm:py-11 text-center rounded-[18px] bg-[#f2c0c0] shadow-[5px_5px_22px_#614d4d,_-5px_-5px_22px_#ffffff]">
        <p className="font-bold font-sans text-2xl sm:text-4xl">Dashboard</p>
        <button
          className="mt-3 sm:mt-4 inline-block py-1 px-5 bg-black text-white font-bold"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
