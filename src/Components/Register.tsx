import React, { useState } from 'react'
import { EyeIcon } from '@heroicons/react/24/outline';  

const Register_Page = () => {
  interface User {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
  }

  const [userDetails, setUserDetails] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [submit, setSubmit] = useState<boolean>(false)
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleSubmit(event: React.FormEvent) {
    setSubmit(true)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Your Account</h1>
        
        <div className="space-y-4">
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={userDetails.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={userDetails.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="email"
            name="email"
            id="email"
            value={userDetails.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={userDetails.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
            >
              <EyeIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              value={userDetails.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}  
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
            >
              <EyeIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register_Page;
