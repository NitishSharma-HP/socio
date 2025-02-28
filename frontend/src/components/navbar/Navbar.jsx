import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import {Link} from 'react-router-dom';
import {useUserContext} from '../../utils/session/UserContext';

const Navbar = () => {
  const {userToken, userDetails, logout} = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(()=>{
    if(userToken && userDetails){
      setUsername(userDetails?.name)
      setIsLoggedIn(true);
    }else{
      setUsername('');
      setIsLoggedIn(false);
    }
  },[userToken,userDetails])

  const handleLogout = () => {
    setIsLoggedIn(false);
    logout();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" className={styles.logoImage} />
      </div>
      <div className={styles.title}>Application</div>
      <div className={styles.userInfo}>
        {isLoggedIn ? (
          <>
          <Link to='/get-cart'>
            <span className={styles.cartPic}><img src="/resources/shopping-cart.png" width='50px' height='50px'/></span>
          </Link>
            <span className={styles.username}>{username}</span>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>
              <button className={styles.loginButton}>Login</button>
            </Link>
            <Link to='/register'>
              <button className={styles.loginButton}>Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
