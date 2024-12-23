import React, { useState } from 'react';
import styles from './Navbar.module.css';
import {Link} from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Nitish');

  const handleLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const handleRegister = () => {};

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" className={styles.logoImage} />
      </div>
      <div className={styles.title}>Application</div>
      <div className={styles.userInfo}>
        {isLoggedIn ? (
          <>
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
