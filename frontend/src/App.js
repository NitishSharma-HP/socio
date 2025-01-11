import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { ToastProvider } from '../src/utils/toast/ToastContext'
import { UserProvider } from './utils/session/UserContext';
function App() {
  return (
    <Router>
      <div>
        <UserProvider>
          <ToastProvider>
            <Navbar />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
          </ToastProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
