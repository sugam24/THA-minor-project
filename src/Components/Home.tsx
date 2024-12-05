import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">
        Welcome to Mental Matters
      </h1>

      <div className="space-y-4">
        <Link
          to="/Login"
          className="px-6 py-3 bg-blue-500 text-white rounded-md block text-center"
        >
          Login
        </Link>
        <Link
          to="/Register"
          className="px-6 py-3 bg-green-500 text-white rounded-md block text-center"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
