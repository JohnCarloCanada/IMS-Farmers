import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Bg } from "../assets";
import { Link } from "react-router-dom";
import LoginContext from "../context/loginContext";

const Login = () => {
  const { setIsLogin, error, setError } = useContext(LoginContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setError("");
    setLoginData((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    const { email, password: pass } = loginData;
    const url = "http://localhost/IMS-Farmers/php/login.php";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const data = {
      email,
      pass,
    };

    const loginOption = {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(url, loginOption);
      const resData = await res.json();
      if (resData.result !== "Logged in successfully! Redirecting...") {
        throw new Error(resData.result);
      } else if (resData.result === "Logged in successfully! Redirecting...") {
        localStorage.setItem("isLogin", JSON.stringify(resData.result));
        setLoginData({
          email: "",
          password: "",
        });
        setIsLogin(resData.result);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="w-full h-screen bg-gradient-to-r from-[#83b378] to-[#dbeab4] flex items-center justify-center">
      <div className="mx-[15px] w-[min(100%,_700px)] bg-[url('../src/assets/Background.jpg')] relative before:bg-gradient-to-r before:from-[#679f69] before:to-[#b8d38e56] before:w-full before:h-full before:absolute bg-cover bg-center flex flex-col items-center justify-center px-7 py-7 rounded-2xl before:rounded-2xl">
        <img
          className="w-[74px] h-[74px] object-contain z-10 mb-10 sm:self-start sm:ml-24"
          src={Logo}
          alt="Logo"
        />
        <section className="z-10">
          <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
            <form
              className="w-full flex flex-col items-center justify-center sm:items-start"
              onSubmit={(e) => e.preventDefault()}
            >
              <h2 className="font-bold text-white text-2xl sm:text-3xl mb-1 sm:mb-2">
                Login
              </h2>
              <div className="mb-2">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  className="outline-none border-none p-1"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter Email Address"
                  value={loginData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  className="outline-none border-none p-1"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
              </div>

              <p className="font-bold text-red-700 flex flex-col gap-y-2">
                {error && <span>{error}</span>}
              </p>

              <div className="mt-3 sm:mt-4 flex flex-col gap-y-2">
                <button
                  className="inline-block bg-[#fbad1b] py-1 sm:py-2 px-7 sm:px-8 font-bold text-white"
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button className="inline-block bg-[#fbad1b] font-bold text-white">
                  <Link
                    aria-label="Go To Register"
                    className="py-1 sm:py-2 px-7 sm:px-8 inline-block"
                    to="/Register"
                  >
                    Register
                  </Link>
                </button>
              </div>
            </form>
            <section className="text-center sm:text-right">
              <h1 className="font-bold text-white text-3xl">
                Farmers Management Platform
              </h1>
            </section>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Login;
