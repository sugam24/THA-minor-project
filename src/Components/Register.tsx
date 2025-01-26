import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";

const Register_Page = () => {
  interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [userDetails, setUserDetails] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submit, setSubmit] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showEyePass, setShowEyePass] = useState<boolean>(false);
  const [showEyePassConf, setShowEyePassConf] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "password") {
      if (value !== "") {
        setShowEyePass(true)
      } else {
        setShowEyePass(false)
      }
    } else if (name === "confirmPassword") {
      if (value !== "") {
        setShowEyePassConf(true)
      } else {
        setShowEyePassConf(false)
      }
    }
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function validateForm(user: User) {
    const error: User = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!user.firstname) {
      error.firstname = "First Name is required";
    }
    if (!user.lastname) {
      error.lastname = "Last Name is required";
    }
    if (!user.email) {
      error.email = "Email is required";
    } else if (!regex.test(user.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!user.password) {
      error.password = "Password is required";
    } else if (user.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (user.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!user.confirmPassword) {
      error.confirmPassword = "Confirm Password is required";
    } else if (user.confirmPassword !== user.password) {
      error.confirmPassword = "Confirm password and password should be same";
    }
    return error;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    let errors = validateForm(userDetails)
    if (Object.values(errors).some((error) => error !== "")) {
      console.log(errors)
      setSubmit(false)
      return
    }
    try {
      const response = await axios.post('http://127.0.0.1:5000', userDetails, {
        headers: {
          "Content-Type": "application/json",  // Set content type to JSON
        },
      });
      console.log("Response from backend:", response.data);
      alert("Your account is registered \n Now you can login")
      setSubmit(true);
      setUserDetails(
        {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }
      )
    } catch (error) {
      console.error("Could not register the user", error)
      setSubmit(false)
    }
  }

  const handleMouseDownPassword = () => {
    setShowPassword(true);
  };

  const handleMouseUpPassword = () => {
    setShowPassword(false);
  };

  const handleMouseDownConfPassword = () => {
    setShowConfirmPassword(true);
  };

  const handleMouseUpConfPassword = () => {
    setShowConfirmPassword(false);
  };

  return (
    <>
      <div className="mt-7 bg-gradient-to-r from-blue-200 to-teal-200 px-4 p-5 w-full rounded-lg min-w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto space-y-4"
        >
          <h3 className="text-center text-xl font-semibold text-to-teal-800 mb-4">
            Welcome To Mental Matters
          </h3>
          <h3 className="text-center text-base text-gray-600 mb-3">
            Create Your Account
          </h3>

          <div className="space-y-3">
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={userDetails.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 hover:border-teal-400"
            />

            <input
              type="text"
              name="lastname"
              id="lastname"
              value={userDetails.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 hover:border-teal-400"
            />

            <input
              type="email"
              name="email"
              id="email"
              value={userDetails.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 hover:border-teal-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={userDetails.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 hover:border-teal-400"
              />
              <button
                type="button"
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                onMouseLeave={handleMouseUpPassword}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-teal-500"
              >
                {showEyePass ? <EyeIcon className="h-4 w-4" /> : <></>}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 hover:border-teal-400"
              />
              <button
                type="button"
                onMouseDown={handleMouseDownConfPassword}
                onMouseUp={handleMouseUpConfPassword}
                onMouseLeave={handleMouseUpConfPassword}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-teal-500"
              >
                {showEyePassConf ? <EyeIcon className="h-4 w-4" /> : <></>}
              </button>
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="w-full py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            >
              Register
            </button>
          </div>

          <div className="text-center mt-3">
            <p className="text-gray-600 text-sm">
              Already Have An Account?{" "}
              <br />
              <Link
                to="/login"
                className="text-teal-500 hover:text-teal-700 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

    </>

  );
};

export default Register_Page;
