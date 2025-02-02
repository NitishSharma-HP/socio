import { React, useState } from 'react';
import styles from './AdminNav.module.css';
import {useNavigate} from 'react-router-dom';

const AdminNav = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.navContainer}>
            <button className={styles.button} onClick={() => navigate('add-brand')}>
                Add Brand
            </button>
            <button className={styles.button} onClick={() => navigate('add-category')}>
                Add Category
            </button>
            <button className={styles.button} onClick={() => navigate('add-product')}>
                Add Product
            </button>
            <button className={styles.button} onClick={() => navigate('/add-role')}>
                Add User Role
            </button>
        </div>
    );
};

export default AdminNav;