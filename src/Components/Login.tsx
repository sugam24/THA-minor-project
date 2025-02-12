import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBarRegister';

const Login = () => {
  const navigate = useNavigate();
  interface User {
    email: string;
    password: string;
  }

  const [userDetails, setUserDetails] = useState<User>({
    email: "",
    password: "",
  });
  const [Submit, setSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showEye, setShowEye] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "password") {
      if (value !== "") {
        setShowEye(true)
      } else {
        setShowEye(false)
      }
    }
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }

  async function handleLogin(event: any) {
    event.preventDefault(); // Prevent default form submission behavior

    setFormErrors(validateForm(userDetails));
    if (Object.values(formErrors).some((error) => error !== "")) {
      console.log(formErrors);
      setSubmit(false);
      return;
    }

    try {
      // post requests to login
      const post_response = await axios.post('http://127.0.0.1:5000/post_login_data', userDetails);
      console.log("Response:", post_response.data);
      console.log("The user who logged in was:", post_response.data.user);

      if (post_response.data.message === 'Login successful') {
        setSubmit(true);
        setUserDetails({
          email: "",
          password: "",
        });

        // Use user_id and user_name from the response to pass to the next page
        const userData = post_response.data.user;
        navigate('/chatbot_interface', { state: { user_id: userData.id, user_name: userData.name } });
      } else {
        setSubmit(false);
        alert(post_response.data.message);
      }
    } catch (error) {
      console.error("Could not log in the user");
      alert("The username doesn't exist.");
      setSubmit(false);
    }
  }

  function validateForm(user: User) {
    const error: User = {
      email: "",
      password: "",
    };
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!user.email) {
      error.email = "Email is required";
    } else if (!regex.test(user.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!user.password) {
      error.password = "Password is required";
    }
    return error;
  }

  function handleMouseDownPassword() {
    setShowPassword(true);
  }

  function handleMouseUpPassword() {
    setShowPassword(false);
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="flex items-center h-screen bg-gradient-to-r bg-gray-100">
        <form className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto space-y-4">
          <h1 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Let’s Get You Logged In
          </h1>

          <div className="space-y-3">
            <input
              type="email"
              name="email"
              id="email"
              value={userDetails.email}
              onChange={handleChange}
              placeholder="Email address"
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
                {showEye ? <EyeIcon className="h-4 w-4" /> : <></>}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-3">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                className="text-teal-500 hover:text-teal-700 font-semibold"
                to="/"
              >
                Register Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
