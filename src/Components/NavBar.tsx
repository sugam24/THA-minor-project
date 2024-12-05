import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4">
      <Link
        to="/"
        className="text-white text-4xl font-bold hover:text-teal-300 transition duration-300 ease-in-out"
      >
        Mental Matters
      </Link>
    </div>
  )
}

export default NavBar
