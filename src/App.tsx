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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='register' element= {<Register/>}/>
          <Route path='login' element= {<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
