import styles from './Home.module.css';
import { useUserContext } from '../../utils/session/UserContext';
import ProductCard from '../screens/user/product/ProductCard';
import ProdCategoriesCard from '../screens/user/productCategories/ProdCategoriesCard';
import AdminNav from '../screens/admin/AdminNav';
import Login from '../auth/Login.jsx'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const { userDetails } = useUserContext();
    console.log(userDetails)
    const userRole = userDetails?.userRole;
    console.log(userRole)
    return (
        <div>
            {userRole ?
                <>
                    {userRole === 1 && <AdminNav />}
                    <ProdCategoriesCard />
                </>
                :
                <></>
                }
        </div>
    )
}
export default Home;