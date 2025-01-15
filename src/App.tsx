import './App.css';
import Register from './Components/Register';
import Home from './Components/Home';
import Login from './Components/Login';

import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import NavBar from './Components/NavBar';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='register' element= {<Register/>}/>
          <Route path='login' element= {<Login/>}/>
          <Route path = 'landing' element = {<Landing/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
