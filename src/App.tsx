import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Chatbot from './Components/Chatbot';

import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='chatbot_interface' element={<Chatbot />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
