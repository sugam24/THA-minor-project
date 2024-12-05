import './App.css';
import Register from './Components/Register';
import Home from './Components/Home';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
