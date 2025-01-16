import { Link } from "react-router-dom";
import Register_Page from "./Register";
import NavBar from "./NavBarLogin";

const Home = () => {
  return (
    <>
    <div><NavBar/></div>
    <div className="flex flex-col items-center min-h-screen bg-gray-100 w-100vh">
      <div className="space-y-4">
        <Link
          to="/Register"
          // className="px-6 py-3 bg-green-500 text-white rounded-md block text-center"
        >
          <Register_Page/>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Home;
