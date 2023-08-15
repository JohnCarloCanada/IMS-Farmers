import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    con_num: "",
    pass1: "",
    pass2: "",
  });

  const [validatedFormData, setValidatedFormData] = useState({
    firstname: false,
    lastname: false,
    email: false,
    con_num: false,
    pass1: false,
    pass2: false,
  });

  const [error, setError] = useState("");
  const [validation, setValidation] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValidation("");
    }, 15000);

    return () => clearTimeout(timeout);
  }, [validation]);

  const handleInputChange = (e) => {
    setError("");
    setFormData((currData) => ({
      ...currData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValidateAndChange = async (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstname":
        if (value) {
          setValidation("");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: true,
          }));
        } else {
          setValidation("No Empty Fields!");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: false,
          }));
        }
        break;

      case "lastname":
        if (value) {
          setValidation("");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: true,
          }));
        } else {
          setValidation("No Empty Fields!");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: false,
          }));
        }
        break;

      case "email":
        let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
          setValidation("No Empty Fields!");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: false,
          }));
        } else if (regexEmail.test(value)) {
          setValidation("");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: true,
          }));
        } else {
          setValidation("Not An Email!");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: false,
          }));
        }
        break;
      case "con_num":
        let regexNumber = /^\d{10,12}$/;

        if (!value) {
          setValidation("No Empty Fields!");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: false,
          }));
        } else if (regexNumber.test(value)) {
          setValidation("");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: true,
          }));
        } else {
          setValidation("Invalid Number!");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: false,
          }));
        }
        break;
      case "pass1":
        let regexPass1 = /^(?=.*[A-Z]).{8,12}$/;

        if (!value) {
          setValidation("No Empty Fields!");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: false,
          }));
        } else if (regexPass1.test(value)) {
          setValidation("");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: true,
          }));
        } else {
          setValidation("Invalid Password!");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: false,
          }));
        }
        break;
      case "pass2":
        if (!value) {
          setValidation("No Empty Fields!");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: false,
          }));
        } else if (value === formData.pass1) {
          setValidation("");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: true,
          }));
        } else {
          setValidation("Password Does Not Match");
          setValidatedFormData((currData) => ({
            ...currData,
            [name]: false,
          }));
        }
        break;
    }
  };

  const handleSubmit = async () => {
    const { firstname, lastname, email, con_num, pass2, pass1 } = formData;
    const {
      firstname: fName,
      lastname: lName,
      email: uEmail,
      con_num: contactNum,
      pass2: password2,
      pass1: password1,
    } = validatedFormData;

    try {
      if (
        !fName ||
        !lName ||
        !uEmail ||
        !contactNum ||
        !password1 ||
        !password2
      ) {
        throw new Error("Please Enter A Valid Information!");
      }

      const isAvailable = await checkEmail();
      if (isAvailable) {
        throw new Error(isAvailable);
      }

      if (firstname && lastname && email && con_num && pass2 && pass1) {
        const url = "http://localhost/IMS-Farmers/php/Register_emp.php";
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const data = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          con_num: con_num,
          pass: pass2,
        };

        const postOption = {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        };

        const res = await fetch(url, postOption);
        const resData = await res.json();

        setValidation(resData.result);

        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          con_num: "",
          pass1: "",
          pass2: "",
        });

        setValidatedFormData({
          firstname: false,
          lastname: false,
          email: false,
          con_num: false,
          pass1: false,
          pass2: false,
        });
      }
    } catch (error) {
      if (error.message) {
        setError(error.message);
        return;
      }
      setError("An error occurred");
    }
  };

  const checkEmail = async () => {
    const { email } = formData;
    if (email) {
      try {
        const res = await fetch(
          "http://localhost/IMS-Farmers/php/email_check.php",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        const resData = await res.json();
        return resData.result;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="w-full h-screen bg-gradient-to-r from-[#83b378] to-[#dbeab4] flex items-center justify-center">
      <div className="mx-[15px] w-[min(100%,_700px)] bg-[url('../src/assets/Background.jpg')] relative before:bg-gradient-to-r before:from-[#679f69] before:to-[#b8d38e56] before:w-full before:h-full before:absolute bg-cover bg-center flex flex-col items-center justify-center px-7 py-7 rounded-2xl before:rounded-2xl shadow-2xl before:shadow-2xl">
        <h2 className="z-10 font-bold text-white text-2xl sm:text-3xl mb-10 self-center">
          Sign-Up
        </h2>
        <form
          className="z-10 w-[70%] self-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="font-bold text-red-700 flex flex-col gap-y-2">
            {error && <span>{error}</span>}
            {validation && <span>{validation}</span>}
          </p>
          <div>
            <label htmlFor="firstname" className="sr-only">
              First Name
            </label>
            <input
              placeholder="First Name*"
              className="p-1 outline-none border-none mb-2 w-[min(min(100%,305px))]"
              type="text"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              onBlur={handleValidateAndChange}
            />
          </div>
          <div>
            <label htmlFor="lastname" className="sr-only">
              Last Name
            </label>
            <input
              placeholder="Last Name*"
              className="p-1 outline-none border-none mb-2 w-[min(min(100%,305px))]"
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              onBlur={handleValidateAndChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              placeholder="Email*"
              className="p-1 outline-none border-none mb-2 w-[min(min(100%,305px))]"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleValidateAndChange}
            />
          </div>
          <div>
            <label htmlFor="con_num" className="sr-only">
              Contact Number
            </label>
            <input
              placeholder="Contact Number*"
              className="p-1 outline-none border-none mb-2 w-[min(min(100%,305px))]"
              type="text"
              name="con_num"
              id="con_num"
              value={formData.con_num}
              onChange={handleInputChange}
              onBlur={handleValidateAndChange}
            />
          </div>
          <div>
            <label htmlFor="pass1" className="sr-only">
              Password
            </label>
            <input
              placeholder="Password*"
              className="p-1 outline-none border-none mb-2 w-[min(min(100%,305px))]"
              type="password"
              name="pass1"
              id="pass1"
              value={formData.pass1}
              onChange={handleInputChange}
              onBlur={handleValidateAndChange}
            />
          </div>
          <div>
            <label htmlFor="pass2" className="sr-only">
              Confirm Password
            </label>
            <input
              placeholder="Confirm Password*"
              className="p-1 outline-none border-none mb-2 w-[min(min(100%,305px))]"
              type="password"
              name="pass2"
              id="pass2"
              value={formData.pass2}
              onChange={handleInputChange}
              onBlur={handleValidateAndChange}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <button
              className="inline-block bg-[#fbad1b] py-1 sm:py-2 px-7 sm:px-8 font-bold text-white"
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </button>
            <button
              className="inline-block bg-[#fbad1b] py-1 sm:py-2 px-7 sm:px-8 font-bold text-white"
              onClick={() => navigate("/Login")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
