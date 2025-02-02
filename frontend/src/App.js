import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Roles from './components/auth/Roles';
import { ToastProvider } from '../src/utils/toast/ToastContext'
import { UserProvider } from './utils/session/UserContext';
import AddProd from './components/screens/admin/AddProd';
import AddCategory from './components/screens/admin/AddCategory';
import AddBrand from './components/screens/admin/AddBrand';
import ProductCard from './components/screens/user/product/ProductCard';
function App() {
  return (
    <Router>
      <div>
        <UserProvider>
          <ToastProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/add-role' element={<Roles />} />
              <Route path='/add-product' element={<AddProd />} />
              <Route path='/get-product-by-category' element={<ProductCard />} />
              <Route path='/add-category' element={<AddCategory />} />
              <Route path='/add-brand' element={<AddBrand />} />
              <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
          </ToastProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
