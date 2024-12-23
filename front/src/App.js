import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
